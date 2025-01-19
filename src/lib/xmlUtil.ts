import { supabase } from '@/lib/supabase';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import fs from 'fs/promises';
import path from 'path';

export async function storeLocalXml(accessKey: string, xmlContent: string) {
  const localDir = path.join(process.cwd(), 'windows-logs', accessKey);
  await fs.mkdir(localDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(localDir, `${timestamp}.xml`);
  await fs.writeFile(filePath, xmlContent);
}

export async function getLocalXmlContent(accessKey: string): Promise<string[]> {
  const localDir = path.join(process.cwd(), 'windows-logs', accessKey);
  const files = await fs.readdir(localDir);
  const xmlFiles = files.filter(file => file.endsWith('.xml') && file !== 'Security.xml');
  
  const xmlContents: string[] = [];
  for (const file of xmlFiles) {
    const filePath = path.join(localDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    xmlContents.push(content);
  }
  
  return xmlContents;
}

export async function combineXmlFiles(accessKey: string): Promise<string> {
  const localXmlContents = await getLocalXmlContent(accessKey);
  const { data: supabaseFiles, error } = await supabase.storage
    .from('windows-logs')
    .list(`logs/${accessKey}`);

  if (error) {
    throw new Error(`Error listing files: ${error.message}`);
  }

  const supabaseXmlFiles = supabaseFiles.filter(file => file.name.endsWith('.xml') && file.name !== 'Security.xml');
  const parser = new XMLParser({ ignoreAttributes: false });
  const builder = new XMLBuilder({ format: true });

  let combinedEvents: any[] = [];

  // Process local XML files
  for (const xmlContent of localXmlContents) {
    const parsedXml = parser.parse(xmlContent);
    if (Array.isArray(parsedXml.Events.Event)) {
      combinedEvents = combinedEvents.concat(parsedXml.Events.Event);
    } else if (parsedXml.Events.Event) {
      combinedEvents.push(parsedXml.Events.Event);
    }
  }

  // Process Supabase XML files
  for (const file of supabaseXmlFiles) {
    const { data, error } = await supabase.storage
      .from('windows-logs')
      .download(`logs/${accessKey}/${file.name}`);

    if (error) {
      console.error(`Error downloading file ${file.name}:`, error);
      continue;
    }

    const xmlContent = await data.text();
    const parsedXml = parser.parse(xmlContent);
    
    if (Array.isArray(parsedXml.Events.Event)) {
      combinedEvents = combinedEvents.concat(parsedXml.Events.Event);
    } else if (parsedXml.Events.Event) {
      combinedEvents.push(parsedXml.Events.Event);
    }
  }

  // Sort events by TimeGenerated
  combinedEvents.sort((a, b) => new Date(b.TimeGenerated).getTime() - new Date(a.TimeGenerated).getTime());

  const combinedXml = builder.build({ Events: { Event: combinedEvents } });
  return combinedXml;
}

export async function deleteSupabaseXmlFiles(accessKey: string) {
  const { data: files, error } = await supabase.storage
    .from('windows-logs')
    .list(`logs/${accessKey}`);

  if (error) {
    throw new Error(`Error listing files: ${error.message}`);
  }

  const xmlFiles = files.filter(file => file.name.endsWith('.xml') && file.name !== 'Security.xml');

  for (const file of xmlFiles) {
    const { error } = await supabase.storage
      .from('windows-logs')
      .remove([`logs/${accessKey}/${file.name}`]);

    if (error) {
      console.error(`Error deleting file ${file.name}:`, error);
    }
  }
}

