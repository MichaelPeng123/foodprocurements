import { useState } from 'react';
import { db } from '../misc/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchTestData = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/test');
      const data = await response.json();
      setMessage(data.message);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from API');
      console.error('Error:', err);
    }
  };

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
      setMessage(`Document added with ID: ${docRef.id}`);
      setError(null);
    } catch (e) {
      setError("Error adding document: " + e.message);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-sans text-3xl font-medium tracking-tight text-gray-800 mb-8">Welcome to MealMetrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-sans text-xl font-medium text-gray-700 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/pdfupload" className="block w-full bg-blue-500 text-white text-center py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors">
              Upload New Document
            </Link>
            <Link to="/database" className="block w-full bg-gray-500 text-white text-center py-3 px-4 rounded font-medium hover:bg-gray-600 transition-colors">
              View Food Database
            </Link>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-sans text-xl font-medium text-gray-700 mb-6">System Status</h2>
          <div className="space-y-4">
            <button onClick={fetchTestData} className="w-full bg-blue-500 text-white py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors">
              Test API Connection
            </button>
            <button onClick={sendData} className="w-full bg-gray-500 text-white py-3 px-4 rounded font-medium hover:bg-gray-600 transition-colors">
              Test Database Connection
            </button>
          </div>
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded font-medium">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-6 p-4 bg-blue-50 text-blue-600 rounded font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;