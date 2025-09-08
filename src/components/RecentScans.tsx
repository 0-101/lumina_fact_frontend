// components/RecentScans.tsx - Display recently scanned items
import { ScanResult } from '../types/scan';

interface RecentScansProps {
  scans: ScanResult[];
  isLoading: boolean;
  error: string | null;
}

const RecentScans = ({ scans, isLoading, error }: RecentScansProps) => {
    scans = []
//   if (error) {
//     return (
//       <div className="recent-scans-card">
//         <h2 className="recent-scans-title">Recent Scans</h2>
//         <div className="error-message">
//           Error: {error}
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="recent-scans-card">
      <div className="recent-scans-header">
        <h2 className="recent-scans-title">Recent Scans</h2>
        <button className="view-all-button">
          View all
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <span className="spinner large"></span>
        </div>
      ) : scans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"></div>
          <p className="empty-state-text">No recent scans yet. Analyze content to see results here.</p>
        </div>
      ) : (
        <ul className="scans-list">
          {scans.map((scan) => (
            <li key={scan.id} className="scan-item">
              <div className="scan-item-content">
                <div className={`accuracy-indicator accuracy-${Math.floor(scan.accuracy / 33)}`}></div>
                <div className="scan-details">
                  <p className="scan-title">{scan.title || 'Untitled Content'}</p>
                  <p className="scan-preview">{scan.url || (scan.content ?? '').substring(0, 100)}</p>
                  <div className="scan-meta">
                    <span className="accuracy-value">Accuracy: {scan.accuracy}%</span>
                    <span className="meta-separator">•</span>
                    <span className="scan-date">{new Date(scan.timestamp).toISOString().slice(0, 10)}</span>
                  </div>
                </div>
                <div className="scan-actions">
                  <button className="view-details-button">
                    View details
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentScans;