import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { ParsedXml, LogEventData } from '@/types/logs';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const xmlFile: File | null = data.get('xml_file') as unknown as File;
    const accessKey = data.get('accessKey') as string;
    // const hostname = data.get('hostname') as string;

    if (!xmlFile || !accessKey) {
      return NextResponse.json({ 
        error: 'Missing required fields: xml_file, accessKey, or hostname' 
      }, { status: 400 });
    }

    // Verify access key
    const { data: computer, error: computerError } = await supabase
      .from('computers')
      .select('*')
      .eq('access_key', accessKey)
      // .eq('hostname', hostname)
      .single();

    if (computerError || !computer) {
      return NextResponse.json({ 
        error: 'Invalid access key or hostname' 
      }, { status: 401 });
    }

    // Update last_seen
    await supabase
      .from('computers')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', computer.id);

    const xmlContent = await xmlFile.text();

    // Store XML in Supabase Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const xmlFilePath = `logs/${accessKey}/${timestamp}.xml`;
    
    const { data: uploadData, error: xmlUploadError } = await supabase.storage
      .from('windows-logs')
      .upload(xmlFilePath, xmlContent, {
        contentType: 'application/xml',
        upsert: true,
        cacheControl: '3600'
      });

    if (xmlUploadError) {
      console.error('Error uploading XML to storage:', xmlUploadError);
      return NextResponse.json({ 
        error: 'Error uploading XML to storage',
        details: xmlUploadError
      }, { status: 500 });
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('windows-logs')
      .getPublicUrl(xmlFilePath);

    console.log('File uploaded successfully. Public URL:', publicUrl);

    // Parse XML and store events in the database
    const parser = new XMLParser({ ignoreAttributes: false });
    const result = parser.parse(xmlContent) as ParsedXml;
    const events = extractEvents(result);

    const { error: insertError } = await supabase
      .from('log_events')
      .insert(events.map(event => ({
        computer_id: computer.id,
        ...event
      })));

    if (insertError) {
      console.error('Error inserting events:', insertError);
      return NextResponse.json({ 
        error: 'Error inserting events',
        details: insertError
      }, { status: 500 });
    }

    // Update or create the timestamps file
    const timestampsFilePath = `logs/${accessKey}/timestamps.json`;
    let timestamps: string[] = [];
    
    const { data: existingFile, error: fetchError } = await supabase.storage
      .from('windows-logs')
      .download(timestampsFilePath);

    if (!fetchError && existingFile) {
      timestamps = JSON.parse(await existingFile.text());
    }

    timestamps.push(timestamp);

    const { error: timestampUploadError } = await supabase.storage
      .from('windows-logs')
      .upload(timestampsFilePath, JSON.stringify(timestamps), {
        contentType: 'application/json',
        upsert: true,
        cacheControl: '3600'
      });

    if (timestampUploadError) {
      console.error('Error uploading timestamps file:', timestampUploadError);
      return NextResponse.json({ 
        error: 'Error uploading timestamps file',
        details: timestampUploadError
      }, { status: 500 });
    }

    // Get the public URL of the timestamps file
    const { data: { publicUrl: timestampsPublicUrl } } = supabase.storage
      .from('windows-logs')
      .getPublicUrl(timestampsFilePath);

    console.log('Timestamps file uploaded successfully. Public URL:', timestampsPublicUrl);

    return NextResponse.json({ 
      message: 'Logs processed and stored successfully',
      xmlPath: xmlFilePath
    });
  } catch (error) {
    console.error('Error processing logs:', error);
    return NextResponse.json({ 
      error: 'Error processing logs' 
    }, { status: 500 });
  }
}

function extractEvents(parsedXml: ParsedXml): LogEventData[] {
  const events: LogEventData[] = [];
  if (Array.isArray(parsedXml.Events.Event)) {
    for (const event of parsedXml.Events.Event) {
      events.push({
        event_id: event.EventID,
        source_name: event.SourceName,
        event_type: event.EventType,
        event_category: event.EventCategory || null,
        message: event.Message || null,
        time_generated: event.TimeGenerated,
        log_type: 'Security'
      });
    }
  }
  return events;
}