import React, { useState } from 'react';
import { storage } from '../firebase';  // You'll need to create this
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

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
      
      // Create storage reference
      const storageRef = ref(storage, `pdfs/${file.name}`);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      
      setUploadStatus('Upload successful!');
      console.log('Download URL:', url);

      // Here you would typically send the URL to your backend
      const response = await fetch('http://localhost:5000/process-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfUrl: url }),
      });

      const data = await response.json();
      console.log('Processed data:', data);

    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Upload failed: ' + error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    status: {
      marginTop: '20px',
      color: '#666',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Upload PDF
        </button>
      </form>
      {uploadStatus && <p style={styles.status}>{uploadStatus}</p>}
    </div>
  );
}