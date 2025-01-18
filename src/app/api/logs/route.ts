import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { ParsedXml, Event, ProcessedEventData } from '@/types/logs';
import fs from 'fs';
import path from 'path';

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
    const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true });
    const result = parser.parse(xmlContent) as ParsedXml;
    const events = extractEvents(result);

    // Save the processed logs to a JSON file
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    const filename = `security_logs_${new Date().toISOString().replace(/:/g, '-')}.json`;
    fs.writeFileSync(path.join(logsDir, filename), JSON.stringify(events, null, 2));

    return NextResponse.json({ message: 'Logs processed and saved successfully', logs: events });
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
        EventID: event.EventID,
        TimeCreated: event.TimeGenerated,
        Computer: 'N/A', // This information is not present in the provided XML
        EventRecordID: 'N/A', // This information is not present in the provided XML
        SourceName: event.SourceName,
        EventType: event.EventType,
        EventCategory: event.EventCategory,
        Message: event.Message,
      };

      events.push(eventData);
    }
  }
  return events;
}

