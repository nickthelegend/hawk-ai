export interface EventSystem {
    EventID: string;
    TimeCreated: {
      '@_SystemTime': string;
    };
    Computer: string;
    EventRecordID: string;
  }
  
  export interface EventData {
    Data: Array<{
      '@_Name': string;
      '#text': string;
    }>;
  }
  
  export interface Event {
    System: EventSystem;
    EventData?: EventData;
  }
  
  export interface ParsedXml {
    Events?: {
      Event: Event | Event[];
    };
  }
  
  export interface ProcessedEventData {
    EventID: string;
    TimeCreated: string;
    Computer: string;
    EventRecordID: string;
    [key: string]: string;
  }
  