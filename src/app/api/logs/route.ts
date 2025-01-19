import { NextRequest, NextResponse } from 'next/server';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { ParsedXml, LogEventData } from '@/types/logs';
import { supabase } from '@/lib/supabase';
import { combineXmlFiles, storeLocalXml, deleteSupabaseXmlFiles, getLocalXmlContent } from '@/lib/xmlUtil';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const xmlFile: File | null = data.get('xml_file') as unknown as File;
    const accessKey = data.get('accessKey') as string;

    if (!xmlFile || !accessKey) {
      return NextResponse.json({ 
        error: 'Missing required fields: xml_file or accessKey' 
      }, { status: 400 });
    }

    // Verify access key
    const { data: computer, error: computerError } = await supabase
      .from('computers')
      .select('*')
      .eq('access_key', accessKey)
      .single();

    if (computerError || !computer) {
      return NextResponse.json({ 
        error: 'Invalid access key' 
      }, { status: 401 });
    }

    // Update last_seen
    await supabase
      .from('computers')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', computer.id);

    const xmlContent = await xmlFile.text();

    // 1. Store logs in local storage
    await storeLocalXml(accessKey, xmlContent);

    // 2. Store logs in Supabase storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const xmlFilePath = `logs/${accessKey}/${timestamp}.xml`;
    
    const { error: xmlUploadError } = await supabase.storage
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

    // 3. Combine XML files and update Security.xml
    const combinedXml = await combineXmlFiles(accessKey);
    const securityXmlPath = `logs/${accessKey}/Security.xml`;

    const { error: securityXmlUploadError } = await supabase.storage
      .from('windows-logs')
      .upload(securityXmlPath, combinedXml, {
        contentType: 'application/xml',
        upsert: true,
        cacheControl: '3600'
      });

    if (securityXmlUploadError) {
      console.error('Error uploading Security.xml:', securityXmlUploadError);
      return NextResponse.json({ 
        error: 'Error uploading Security.xml',
        details: securityXmlUploadError
      }, { status: 500 });
    }

    // Delete old XML files from Supabase storage
    await deleteSupabaseXmlFiles(accessKey);

    // Update local Security.xml
    const localSecurityXmlPath = path.join(process.cwd(), 'windows-logs', accessKey, 'Security.xml');
    await fs.writeFile(localSecurityXmlPath, combinedXml);

    return NextResponse.json({ 
      message: 'Logs processed, stored, and combined successfully',
      xmlPath: xmlFilePath,
      securityXmlPath: securityXmlPath
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

