import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // GET request example
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

  // POST request example
  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'value' })
      });
      const data = await response.json();
      setMessage(JSON.stringify(data));
      setError(null);
    } catch (err) {
      setError('Failed to send data to API');
      console.error('Error:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Flask API Test</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={fetchTestData} style={{ margin: '10px' }}>
            Test GET Request
          </button>
          <button onClick={sendData} style={{ margin: '10px' }}>
            Test POST Request
          </button>
        </div>

        {error && (
          <div style={{ color: 'red', margin: '10px' }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ margin: '10px' }}>
            Response from API: {message}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;