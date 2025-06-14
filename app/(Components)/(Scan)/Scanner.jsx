'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Chill from "@/public/chill.png"

function Scanner() {
  const searchParams = useSearchParams();
  const [shodanData, setShodanData] = useState(null);
  const [virusTotalData, setVirusTotalData] = useState(null);
  const [show, setShow] = useState(false);
  const [report,setReport] = useState("")
  const [zapData,setZapData]  = useState(null)
  const router = useRouter()

  useEffect(() => {
    const target = searchParams.get('target');
    console.log('✅ Target from URL:', target);

    if (!target) {
      console.warn('🚫 No target found in URL query!');
      return;
    }

    const fetchScan = async () => {
      try {
        // 1. Shodan Scan
        console.log('🛡️ Starting Shodan scan...');
        const res = await fetch('/api/shodanscan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ target }),
        });
        const data = await res.json();
        console.log('✅ Shodan Data:', data);
        setShodanData(data);

         // 2. Virus Total Scan (after Zodan is successful)
         if (data.success) {
          console.log('🛡️ Starting Virus Total scan...');
          const virusRes = await fetch('/api/virustotal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ target }),
          });
          const virusData = await virusRes.json();
          console.log('🧪 Virus Total Result:', virusData);
          setVirusTotalData(virusData)
        }

        // 2. ZAP Scan (after Shodan is successful)
        if ( 1 ==1 ) {
        console.log('🛡️ Starting ZAP scan...');
        const zapRes = await fetch('/api/zapscan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ target }),
        });
        const zapData = await zapRes.json();
        setReport(zapData.reportPath)
        setZapData(zapData)
        console.log('🧪 ZAP Scan Result:', zapData);
      }
      setShow(true)
      } catch (error) {
        console.error('❌ Error fetching scan:', error);
      }
    };

    fetchScan();
  }, [searchParams]);
  //&& shodanData && shodanData.results

  if (show ) {
    return (
      <div className="min-h-screen p-6 text-[0.8rem]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">
            🚀 Shodan Results
          </h1>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <p className=" font-medium text-gray-700">
              ✅ <span className="font-semibold">Success:</span>{' '}
              {shodanData.success ? 'Yes' : 'No'}
            </p>
            <p className=" font-medium text-gray-700">
              💬 <span className="font-semibold">Message:</span> {shodanData.message}
            </p>
            <p className=" font-medium text-gray-700">
              🔍 <span className="font-semibold">Total Results:</span> {shodanData.totalResults}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shodanData.results.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold text-indigo-500 mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-1 inline"><span className="font-medium">Description:</span> {item.description}</p>
                <p className="text-gray-700 mb-1 inline"><span className="font-medium">Query:</span> {item.query}</p>
                <p className="text-gray-700 mb-1 inline"><span className="font-medium">Tags:</span> {item.tags.join(', ')}</p>
                <p className="text-gray-700 mb-1 inline"><span className="font-medium">Votes:</span> {item.votes}</p>
                <p className="text-gray-600 text-sm mt-2 inline">🕒 {item.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
        { 
         virusTotalData.success ? 
          <div className="bg-white shadow-xl rounded-xl p-6 mt-6 w-full max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">🛡 VirusTotal Summary</h2>
        
          {/* Analysis Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(virusTotalData.analysis_stats).map(([key, value]) => (
              <div key={key} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600 capitalize">{key}</p>
                <p className={`text-lg font-bold ${
                  key === 'malicious' ? 'text-red-600' :
                  key === 'suspicious' ? 'text-yellow-600' :
                  key === 'harmless' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        
          {/* Reputation */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 mb-1">Reputation Score</p>
            <div className="text-3xl font-bold text-purple-600">{virusTotalData.reputation}</div>
          </div>
        
          {/* Categories */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">🔖 Categories</p>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              {Object.entries(virusTotalData.categories).map(([source, label], idx) => (
                <li key={idx}>
                  <span className="font-medium text-blue-700">{source}</span>: {label}
                </li>
              ))}
            </ul>
          </div>
        </div>   :null     
        }
        { 
         zapData.success ? 
          <div className="bg-white shadow-xl flex flex-col items-center rounded-xl p-6 mt-6 w-full max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">🛡 Zap Scan Summary</h2>
        <button onClick={() =>{
          router.push(`/zapreport?path=${report}`)
        }} className="bg-green-600 cursor-pointer hover:bg-green-700 text-white w-60 sm:w-80 py-2 rounded-xl text-sm transition-all shadow-md">Read the Report</button>
        </div>:null
}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center -z-10 mt-[-3rem] p-10 bg-gradient-to-b">
      <Image src={Chill} height={250} alt="Chilling" className="mb-6 animate-fade-in" />
      <div className="text-center space-y-4">
        <div className="relative h-16 w-16 mx-auto mb-2">
          <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-30 animate-ping" />
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Fetching in progress...</h2>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Hang tight! We’re scanning your request.
        </p>
      </div>
    </div>
  );
}

export default Scanner;
