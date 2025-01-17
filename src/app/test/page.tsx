'use client';

import { useState } from 'react';
import { ProcessedEventData } from '@/types/logs';

export default function Home() {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<ProcessedEventData[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setLogs(result.logs || []);
      } else {
        setMessage(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Windows Log Analyzer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" name="file" accept=".xml" required className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload and Process
        </button>
      </form>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {logs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Processed Logs</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Event ID</th>
                <th className="px-4 py-2 border-b">Time Created</th>
                <th className="px-4 py-2 border-b">Computer</th>
                <th className="px-4 py-2 border-b">Event Record ID</th>
                <th className="px-4 py-2 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2 border-b">{log.EventID}</td>
                  <td className="px-4 py-2 border-b">{log.TimeCreated}</td>
                  <td className="px-4 py-2 border-b">{log.Computer}</td>
                  <td className="px-4 py-2 border-b">{log.EventRecordID}</td>
                  <td className="px-4 py-2 border-b">
                    <details>
                      <summary>View Details</summary>
                      <pre className="text-xs mt-2">
                        {JSON.stringify(log, null, 2)}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

