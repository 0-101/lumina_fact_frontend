// types/scan.ts - Type definitions for scan data
export interface ScanResult {
    id: string;
    title: string;
    url?: string;
    content: string;
    accuracy: number;
    timestamp: string;
    // Add other properties as needed
  }