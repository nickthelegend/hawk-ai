declare module 'node-evtx' {
    import { Readable } from 'stream';
  
    export class EventLog {
      constructor(input: string | Readable);
      on(event: 'data' | 'end' | 'error', callback: (data: any) => void): void;
    }
  }
  