import React, { useState, useEffect } from 'react';
import { db } from '../misc/firebase';
import { collection, getDocs } from "firebase/firestore";

function Database() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foodData"));
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Add the description from our map if available
          const description = data.Description;
          return {
            id: doc.id,
            ...data,
            Description: description
          };
        });
        setFoodItems(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to fetch food items");
        setLoading(false);
      }
    };
    
    // console.log(foodIndexRaw.description);

    fetchFoodItems();
  }, []);

  // Filter items based on search term
  const filteredItems = foodItems.filter(item =>
    item.Description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Food Procurement Database</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="max-w-xl relative">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition-colors"
          />
          <svg 
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredItems.length} of {foodItems.length} items
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UOM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foodcode</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.Description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["Pack Size"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Pack}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.UOM}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["Price Per Pack"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["Price Per Pack Size"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Foodcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Database;

