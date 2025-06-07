'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Chill from '@/public/chill.png';

function Report() {
  const searchParams = useSearchParams();
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const path = searchParams.get('path');
      if (!path) {
        setError('No report path provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/report?path=${encodeURIComponent(path)}`);
        if (!response.ok) throw new Error('Failed to load report');
        const content = await response.text();
        setHtmlContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-[-3rem] p-10 bg-gradient-to-b">
        <Image src={Chill} height={250} alt="Chilling" className="mb-6 animate-fade-in" />
        <div className="text-center space-y-4">
          <div className="relative h-16 w-16 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-30 animate-ping" />
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Fetching in progress...</h2>
          <p className="text-sm text-gray-700 max-w-md mx-auto">
            Hang tight! We're loading your report.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <iframe
  className="w-full h-screen"
  srcDoc={htmlContent}
  title="ZAP Report"
  sandbox="allow-same-origin allow-scripts"
  loading="lazy"  // Add lazy loading
/>
  );
}

export default Report;