import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../misc/supabaseClient';

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    try {
      setUploadStatus('Uploading...');

      // Upload PDF to Supabase storage
      const pdfFileName = `${Date.now()}_${file.name}`;
      const { data: pdfData, error: pdfError } = await supabase.storage
        .from('food-documents')
        .upload(`pdfs/${pdfFileName}`, file);
      
      if (pdfError) throw pdfError;
      
      // Get public URL for the uploaded PDF
      const { data: { publicUrl: pdfUrl } } = supabase.storage
        .from('food-documents')
        .getPublicUrl(`pdfs/${pdfFileName}`);
      
      console.log("PDF URL: ", pdfUrl);
      
      // Send to backend for processing
      const response = await fetch('http://localhost:5005/process-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'pdf_url': pdfUrl }),
      });
      
      const data = await response.json();
      console.log("Response: ", data);

      if (data.csv_content) {
        // Create a blob from the CSV content
        const csvBlob = new Blob([data.csv_content], { type: 'text/csv' });
        
        // Upload CSV to Supabase Storage
        const csvFileName = pdfFileName.replace('.pdf', '.csv');
        const { data: csvData, error: csvError } = await supabase.storage
          .from('food-documents')
          .upload(`csvs/${csvFileName}`, csvBlob);
        
        if (csvError) throw csvError;
        
        // Get public URL for the CSV
        const { data: { publicUrl: csvUrl } } = supabase.storage
          .from('food-documents')
          .getPublicUrl(`csvs/${csvFileName}`);
        
        // Navigate to PriceEdits with the CSV download URL
        navigate('/priceEdits', { 
          state: { csvUrl: csvUrl, csvFileName: csvFileName }
        });
      }
      else {
        setUploadStatus('Upload failed: ' + data.message);
      }

      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Upload failed: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Upload PDF Document</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${file ? 'bg-green-50 border-green-500' : ''}`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="font-sans text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {file ? file.name : 'Drop your PDF here or click to upload'}
            </label>
          </div>
          <button
            type="submit"
            disabled={!file}
            className={`w-full py-3 px-4 rounded font-medium transition-colors
              ${file 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Process Document
          </button>
        </form>
        {uploadStatus && (
          <div className={`mt-6 p-4 rounded font-medium
            ${uploadStatus.includes('successful') 
              ? 'bg-green-50 text-green-600' 
              : uploadStatus === 'Uploading...'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-red-50 text-red-600'}`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
}
