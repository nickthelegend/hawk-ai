import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { ParsedXml, Event, ProcessedEventData } from '@/types/logs';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith('.xml')) {
    return NextResponse.json({ error: 'Please upload an XML file' }, { status: 400 });
  }

  const xmlContent = await file.text();

  try {
    const parser = new XMLParser();
    const result = parser.parse(xmlContent) as ParsedXml;
    const events = extractEvents(result);
    return NextResponse.json({ message: 'Logs processed successfully', logs: events });
  } catch (error) {
    console.error('Error processing XML file:', error);
    return NextResponse.json({ error: 'Error processing XML file' }, { status: 500 });
  }
}

function extractEvents(parsedXml: ParsedXml): ProcessedEventData[] {
  const events: ProcessedEventData[] = [];
  if (parsedXml.Events && parsedXml.Events.Event) {
    const rawEvents = Array.isArray(parsedXml.Events.Event) 
      ? parsedXml.Events.Event 
      : [parsedXml.Events.Event];

    for (const event of rawEvents) {
      const eventData: ProcessedEventData = {
        EventID: event.System.EventID,
        TimeCreated: event.System.TimeCreated['@_SystemTime'],
        Computer: event.System.Computer,
        EventRecordID: event.System.EventRecordID,
      };

      if (event.EventData && event.EventData.Data) {
        event.EventData.Data.forEach((data) => {
          if (data['@_Name'] && data['#text']) {
            eventData[data['@_Name']] = data['#text'];
          }
        });
      }

      events.push(eventData);
    }
  }
  return events;
}

