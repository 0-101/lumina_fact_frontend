// pages/index.tsx - Main dashboard page
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ScanInput from '../components/ScanInput';
import RecentScans from '../components/RecentScans';
import TipsSection from '../components/TipsSection';
import { ScanResult } from '../types/scan';

export default function Dashboard() {
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recent scans on component mount
  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        setIsLoading(true);
        // This would be replaced with actual API call
        const response = await fetch('https://api.example.com/scans/recent');
        
        if (!response.ok) {
          throw new Error('Failed to fetch recent scans');
        }
        
        const data = await response.json();
        setRecentScans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentScans();
  }, []);

  const handleNewScan = (newScan: ScanResult) => {
    // Add new scan to the beginning of the list
    setRecentScans(prevScans => [newScan, ...prevScans.slice(0, 4)]);
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>TruthGuard | Misinformation Detection</title>
        <meta name="description" content="Detect misinformation in online content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="main-content">
        <div className="flex justify-between items-center">
        <h1 className="page-title text-2xl font-bold">Dashboard</h1>
        </div>
        <p className="page-subtitle">Identify and verify the authenticity of online content</p>
        
        {/* Scan Input Section */}
        <ScanInput onNewScan={handleNewScan} />
        
        <div className="content-grid">
          {/* Recent Scans Section - 2/3 width on large screens */}
          <div className="recent-scans-container">
            <RecentScans 
              scans={recentScans} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
          
          {/* Educational Tips Section - 1/3 width on large screens */}
          <div className="tips-container">
            {/* <TipsSection /> */}
          </div>
        </div>
      </main>
    </div>
  );
}