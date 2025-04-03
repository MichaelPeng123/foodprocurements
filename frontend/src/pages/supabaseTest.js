import { useState } from 'react';
import supabase from '../misc/supabaseClient';

export default function SupabaseTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Generate random dummy data
  const generateDummyData = (count = 10) => {
    const schoolNames = ['Washington High', 'Lincoln Elementary', 'Roosevelt Middle', 'Jefferson Academy', 'Kennedy School'];
    const descriptions = ['Apples', 'Bananas', 'Bread', 'Milk', 'Eggs', 'Chicken', 'Rice', 'Pasta', 'Carrots', 'Potatoes'];
    const uoms = ['EA', 'LB', 'OZ', 'CS', 'BG'];
    
    return Array.from({ length: count }, (_, i) => ({
      Description: descriptions[Math.floor(Math.random() * descriptions.length)],
      Pack: Math.floor(Math.random() * 20) + 1,
      Pack_size: `${Math.floor(Math.random() * 100) + 1}oz`,
      Price: parseFloat((Math.random() * 100 + 1).toFixed(2)),
      Price_per_pack: parseFloat((Math.random() * 50 + 1).toFixed(2)),
      Per_per_pack_size: parseFloat((Math.random() * 10 + 0.5).toFixed(2)),
      Quantity: Math.floor(Math.random() * 100) + 1,
      Size: Math.floor(Math.random() * 50) + 1,
      UOM: uoms[Math.floor(Math.random() * uoms.length)],
      Document_year: 2022 + Math.floor(Math.random() * 3),
      School_name: schoolNames[Math.floor(Math.random() * schoolNames.length)]
    }));
  };

  // Insert dummy data to Supabase
  const insertDummyData = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setDownloadUrl(null);
    
    try {
      const dummyData = generateDummyData(20);
      const { data, error } = await supabase
        .from('food_data')
        .insert(dummyData)
        .select();
      
      if (error) throw error;
      
      setResult(`Successfully inserted ${data.length} records!`);
      
      // Create CSV for download
      const csvContent = "data:text/csv;charset=utf-8," 
        + "id,Description,Pack,Pack_size,Price,Price_per_pack,Per_per_pack_size,Quantity,Size,UOM,Document_year,School_name\n"
        + data.map(item => 
            `${item.id},"${item.Description}",${item.Pack},"${item.Pack_size}",${item.Price},${item.Price_per_pack},${item.Per_per_pack_size},${item.Quantity},${item.Size},"${item.UOM}",${item.Document_year},"${item.School_name}"`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      setDownloadUrl(encodedUri);
    } catch (err) {
      console.error('Error inserting data:', err);
      setError(err.message || 'An error occurred while inserting data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data from Supabase
  const downloadAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('food_data')
        .select('*');
      
      if (error) throw error;
      
      // Create CSV for download
      const csvContent = "data:text/csv;charset=utf-8," 
        + "id,Description,Pack,Pack_size,Price,Price_per_pack,Per_per_pack_size,Quantity,Size,UOM,Document_year,School_name\n"
        + data.map(item => 
            `${item.id},"${item.Description}",${item.Pack},"${item.Pack_size}",${item.Price},${item.Price_per_pack},${item.Per_per_pack_size},${item.Quantity},${item.Size},"${item.UOM}",${item.Document_year},"${item.School_name}"`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      setDownloadUrl(encodedUri);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Food Data Test</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={insertDummyData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Insert Dummy Data'}
        </button>
        
        <button
          onClick={downloadAllData}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
        >
          {loading ? 'Processing...' : 'Fetch & Download All Data'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{result}</p>
        </div>
      )}
      
      {downloadUrl && (
        <div className="mt-4">
          <a 
            href={downloadUrl} 
            download="food_data.csv"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </a>
        </div>
      )}
    </div>
  );
}
