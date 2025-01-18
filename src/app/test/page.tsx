'use client';

import { useState, useEffect } from 'react';
import { ProcessedEventData } from '@/types/logs';

export default function Home() {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<ProcessedEventData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/logs');
        const data = await response.json();
        if (response.ok) {
          setLogs(data.logs || []);
          setMessage('');
        } else {
          setMessage(data.error || 'An error occurred while fetching logs');
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
        setMessage('Error fetching logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 60000); // Fetch logs every minute

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Windows Security Log Viewer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" name="file" accept=".xml" required className="mb-2" />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload and Process'}
        </button>
      </form>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      {isLoading ? (
        <p>Loading logs...</p>
      ) : logs.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Security Logs</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Event ID</th>
                <th className="px-4 py-2 border-b">Time Created</th>
                <th className="px-4 py-2 border-b">Source Name</th>
                <th className="px-4 py-2 border-b">Event Type</th>
                <th className="px-4 py-2 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2 border-b">{log.EventID}</td>
                  <td className="px-4 py-2 border-b">{log.TimeCreated}</td>
                  <td className="px-4 py-2 border-b">{log.SourceName}</td>
                  <td className="px-4 py-2 border-b">{log.EventType}</td>
                  <td className="px-4 py-2 border-b">
                    <details>
                      <summary>View Details</summary>
                      <pre className="text-xs mt-2 whitespace-pre-wrap">
                        {log.Message}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}

