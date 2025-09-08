// components/ScanInput.tsx - Input section for scanning content
import { useState, useRef } from 'react';
import { ScanResult } from '../types/scan';

interface ScanInputProps {
  onNewScan: (scan: ScanResult) => void;
}

const ScanInput = ({ onNewScan }: ScanInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one input method has content
    if (!inputValue.trim() && files.length === 0) {
      setError('Please enter a URL/text or upload a file to analyze');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare content based on input
      let content = '';
      let type = 'text';
      
      if (inputValue.trim()) {
        content = inputValue;
        // Simple URL detection
        if (inputValue.startsWith('http://') || inputValue.startsWith('https://')) {
          type = 'url';
        }
      } else if (files.length > 0) {
        // For files, we'd normally process them, but for now we'll just use the file names
        content = `Files: ${files.map(file => file.name).join(', ')}`;
        type = 'file';
      }
      
      // This would be replaced with actual API call
      const response = await fetch('https://api.example.com/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content,
          type 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Scan failed. Please try again.');
      }
      
      const result: ScanResult = await response.json();
      onNewScan(result);
      
      // Reset form
      setInputValue('');
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(newFiles);
      // Clear text input when files are selected
      setInputValue('');
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(newFiles);
      // Clear text input when files are selected
      setInputValue('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Clear files when text is entered
    if (e.target.value.trim() && files.length > 0) {
      setFiles([]);
    }
  };

  // Determine if inputs should be disabled
  const isTextInputDisabled = files.length > 0;
  const isFileInputDisabled = inputValue.trim().length > 0;

  return (
    <div className="scan-input-card">
      <h2 className="scan-input-title">Check for Misinformation</h2>
      
      <form onSubmit={handleSubmit} className="scan-form">
        <div className="input-row">
          {/* Text/URL Input */}
          <div className={`text-input-section ${isTextInputDisabled ? 'input-disabled' : ''}`}>
            <label htmlFor="text-input" className="input-label">Enter URL or Text</label>
            <textarea
              id="text-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Paste URL or text content to analyze for misinformation..."
              className="text-input"
              disabled={isTextInputDisabled || isLoading}
              rows={4}
            />
          </div>
          
          {/* Divider with OR text */}
          <div className="input-divider-vertical">
            <span className="divider-line-vertical"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line-vertical"></span>
          </div>
          
          {/* File Upload */}
          <div className={`file-input-section ${isFileInputDisabled ? 'input-disabled' : ''}`}>
            <label htmlFor="file-input" className="input-label">Upload File</label>
            <div 
              className="file-dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !isFileInputDisabled && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="file-input"
                disabled={isFileInputDisabled || isLoading}
                multiple
                style={{ display: 'none' }}
              />
              
              {files.length === 0 ? (
                <div className="dropzone-content">
                  <div className="upload-icon"></div>
                  <p className="dropzone-text">Drag & drop files here or click to browse</p>
                  <p className="dropzone-subtext">Supports PDF, DOCX, TXT files</p>
                </div>
              ) : (
                <div className="files-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="scan-actions">
          <div className="scan-info">
            Analyze articles, social media posts, news content, and more.
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="scan-button scan-button-large"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : 'Scan Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScanInput;