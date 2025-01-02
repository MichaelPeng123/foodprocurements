import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

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
    <div className="page-container">
      <header className="page-header">
        <h1>React + Flask API Test</h1>
        
        <div className="button-container">
          <button onClick={fetchTestData} className="action-button">
            Test GET Request
          </button>
          <button onClick={sendData} className="action-button">
            Test POST Request
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {message && (
          <div className="response-message">
            Response from API: {message}
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;