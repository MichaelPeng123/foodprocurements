import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../misc/supabaseClient';

export default function DocumentUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files || e.dataTransfer.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setUploadStatus('Please select at least one file');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const fileUrls = [];

      for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('food-documents')
          .upload(`user-uploads/${fileName}`, file);
        if (fileError) throw fileError;

        const { data: { publicUrl } } = supabase.storage
          .from('food-documents')
          .getPublicUrl(`user-uploads/${fileName}`);

        fileUrls.push(publicUrl);
      }

      console.log("Uploaded File URLs: ", fileUrls);

      const response = await fetch('http://localhost:5005/process-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_urls: fileUrls }),
      });

      const data = await response.json();
      console.log("Backend Response: ", data);

      if (response.ok && data.status === 'success') {
        navigate('/priceEdits', {
          state: { csvFileName: data.csvFileName, csvUrl: data.csvUrl }
        });
        setUploadStatus('Upload and processing successful!');
      } else {
        setUploadStatus('Processing failed: ' + (data.message || 'Unknown error'));
      }

    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Upload failed: ' + error.message);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Upload Your Documents</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${files.length > 0 ? 'bg-green-50 border-green-500' : ''}`}
          >
            <input
              type="file"
              // ✨ Accept .xlsx and .xls files
              accept=".pdf,.jpg,.jpeg,.png,.bmp,.tiff,.csv,.xlsx,.xls"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="font-sans text-gray-600 cursor-pointer hover:text-blue-600"
            >
              {files.length > 0 
                ? `${files.length} file(s) selected` 
                // ✨ Updated label text for Excel
                : 'Drop PDFs, Images, CSVs, or Excel files here'}
            </label>
          </div>
          <button
            type="submit"
            disabled={files.length === 0}
            className={`w-full py-3 px-4 rounded font-medium transition-colors
              ${files.length > 0 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Process Documents
          </button>
        </form>
        {uploadStatus && (
          <div className={`mt-6 p-4 rounded font-medium text-sm
            ${uploadStatus.includes('successful') 
              ? 'bg-green-50 text-green-700' 
              : uploadStatus.includes('Uploading')
                ? 'bg-blue-50 text-blue-700'
                : 'bg-red-50 text-red-700'}`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
}