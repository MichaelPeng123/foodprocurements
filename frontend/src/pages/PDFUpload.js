import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../misc/supabaseClient';

export default function PdfUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files)); // Convert FileList to Array
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

      // Upload all files (PDFs & images) to Supabase
      for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('food-documents')
          .upload(`csvs/${fileName}`, file);
        if (fileError) throw fileError;

        const { data: { publicUrl } } = supabase.storage
          .from('food-documents')
          .getPublicUrl(`csvs/${fileName}`);

        fileUrls.push(publicUrl);
      }

      console.log("Uploaded File URLs: ", fileUrls);

      // Send file URLs to backend for processing
      const response = await fetch('http://localhost:5005/process-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_urls: fileUrls }),
      });

      const data = await response.json();
      console.log("Backend Response: ", data);

      if (data.status === 'success') {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Upload PDF and Image Files</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${files.length > 0 ? 'bg-green-50 border-green-500' : ''}`}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.bmp,.tiff"
              multiple
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="font-sans text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {files.length > 0 
                ? `${files.length} file(s) selected` 
                : 'Drop your PDFs or Images here or click to upload'}
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
