export interface Event {
  EventID: string;
  TimeGenerated: string;
  SourceName: string;
  EventType: string;
  EventCategory: string;
  Message: string;
}

export interface ParsedXml {
  Events: {
    Event: Event | Event[];
  };
}

export interface ProcessedEventData {
  EventID: string;
  TimeCreated: string;
  Computer: string;
  EventRecordID: string;
  SourceName: string;
  EventType: string;
  EventCategory: string;
  Message: string;
}

