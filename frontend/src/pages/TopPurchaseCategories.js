import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopPurchaseCategories = () => {
  // State to store real category data from API
  const [purchasingCategories, setPurchasingCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State to track which category's details are being viewed
  const [selectedCategory, setSelectedCategory] = useState(null);
  // State to track which modal is open (items or suppliers)
  const [modalType, setModalType] = useState(null);

  // Make API call when component mounts
  useEffect(() => {
    const fetchPurchaseAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:5005/api/purchase-analytics-query', {});
        console.log('Purchase analytics data loaded');
        
        // Process the category totals from API response
        if (response.data && response.data.category_totals) {
          const categoryData = Object.entries(response.data.category_totals)
            .map(([name, value], index) => {
              // Format the value as currency with M suffix if over 1 million
              const formattedValue = value >= 1000000 
                ? `$${(value / 1000000).toFixed(1)}M` 
                : `$${value.toLocaleString()}`;
              
              // Store the raw value for bar calculations
              const volumeValue = value >= 1000000 
                ? parseFloat((value / 1000000).toFixed(1)) 
                : value / 1000000; // Convert smaller values to same scale
              
              return {
                id: index + 1,
                name,
                volume: formattedValue,
                volumeValue
              };
            })
            // Sort by volume descending
            .sort((a, b) => b.volumeValue - a.volumeValue);
          
          setPurchasingCategories(categoryData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching purchase analytics:', error);
        setIsLoading(false);
      }
    };

    fetchPurchaseAnalytics();
  }, []);

  // Dummy data for items by category
  const itemsByCategory = {
    // 1: [
    //   { id: 1, name: 'Carbon Frames', volume: '$1.27M', purchaseDate: '2023-11-15' },
    //   { id: 2, name: 'Gravel Frames', volume: '$1.03M', purchaseDate: '2023-10-22' },
    //   { id: 3, name: 'Aluminum Frames', volume: '$0.9M', purchaseDate: '2023-09-18' },
    //   { id: 4, name: 'Race Frames', volume: '$0.5M', purchaseDate: '2023-08-05' },
    // ],
    // 2: [
    //   { id: 1, name: 'Display', volume: '$1.31M', purchaseDate: '2023-12-01' },
    //   { id: 2, name: 'Battery Pack', volume: '$0.93M', purchaseDate: '2023-11-20' },
    //   { id: 3, name: 'Sensors', volume: '$0.66M', purchaseDate: '2023-10-15' },
    // ],
    // 3: [
    //   { id: 1, name: 'Bottom Bracket', volume: '$0.85M', purchaseDate: '2023-11-25' },
    //   { id: 2, name: 'Chains', volume: '$0.95M', purchaseDate: '2023-12-03' },
    // ],
    // 4: [
    //   { id: 1, name: 'Carbon Wheels', volume: '$0.87M', purchaseDate: '2023-10-05' },
    //   { id: 2, name: 'Inner Tubes', volume: '$0.83M', purchaseDate: '2023-11-10' },
    // ],
    // 5: [
    //   { id: 1, name: 'Bar End Plugs', volume: '$0.75M', purchaseDate: '2023-09-28' },
    // ],
    // 6: [
    //   { id: 1, name: 'Various Saddles', volume: '$0.3M', purchaseDate: '2023-10-12' },
    // ],
    // 7: [
    //   { id: 1, name: 'Brake Pads', volume: '$0.05M', purchaseDate: '2023-08-15' },
    // ],
    // 8: [
    //   { id: 1, name: 'Cleaning Supplies', volume: '$0.05M', purchaseDate: '2023-07-20' },
    // ],
  };

  // Dummy data for suppliers by category
  const suppliersByCategory = {
    // 1: [
    //   { id: 1, name: 'Roller Coaster', volume: '$1.2M', purchaseDate: '2023-12-05' },
    //   { id: 2, name: 'Power Bikes', volume: '$0.7M', purchaseDate: '2023-11-18' },
    //   { id: 3, name: 'Easy Riders', volume: '$1.8M', purchaseDate: '2023-10-30' },
    // ],
    // 2: [
    //   { id: 1, name: 'River Systems', volume: '$1.02M', purchaseDate: '2023-12-10' },
    //   { id: 2, name: 'Greenholt Group', volume: '$0.61M', purchaseDate: '2023-11-25' },
    //   { id: 3, name: 'Vibe Bike', volume: '$0.65M', purchaseDate: '2023-10-22' },
    //   { id: 4, name: 'Power Bikes', volume: '$0.62M', purchaseDate: '2023-09-15' },
    // ],
    // 3: [
    //   { id: 1, name: 'Greenholt Group', volume: '$0.47M', purchaseDate: '2023-11-08' },
    //   { id: 2, name: 'Vibe Bike', volume: '$0.43M', purchaseDate: '2023-10-12' },
    // ],
    // 4: [
    //   { id: 1, name: 'Road Runner', volume: '$0.81M', purchaseDate: '2023-12-01' },
    // ],
    // 5: [
    //   { id: 1, name: 'Vibe Bike', volume: '$0.7M', purchaseDate: '2023-11-20' },
    // ],
    // 6: [
    //   { id: 1, name: 'Comfort Plus', volume: '$0.3M', purchaseDate: '2023-09-05' },
    // ],
    // 7: [
    //   { id: 1, name: 'Safety First', volume: '$0.05M', purchaseDate: '2023-08-22' },
    // ],
    // 8: [
    //   { id: 1, name: 'Maintenance Pro', volume: '$0.05M', purchaseDate: '2023-07-15' },
    // ],
  };

  // Get the top item for each category
  const getTopItem = (categoryId) => {
    const items = itemsByCategory[categoryId] || [];
    if (items.length === 0) return { name: 'N/A', volume: '$0' };
    return items.reduce((prev, current) => {
      // Extract numeric value from volume string (remove $ and M)
      const prevValue = parseFloat(prev.volume.replace('$', '').replace('M', ''));
      const currentValue = parseFloat(current.volume.replace('$', '').replace('M', ''));
      return currentValue > prevValue ? current : prev;
    }, items[0]);
  };

  // Get the top supplier for each category
  const getTopSupplier = (categoryId) => {
    const suppliers = suppliersByCategory[categoryId] || [];
    if (suppliers.length === 0) return { name: 'N/A', volume: '$0' };
    return suppliers.reduce((prev, current) => {
      // Extract numeric value from volume string (remove $ and M)
      const prevValue = parseFloat(prev.volume.replace('$', '').replace('M', ''));
      const currentValue = parseFloat(current.volume.replace('$', '').replace('M', ''));
      return currentValue > prevValue ? current : prev;
    }, suppliers[0]);
  };

  // Open modal to show all items or suppliers
  const openModal = (categoryId, type) => {
    setSelectedCategory(categoryId);
    setModalType(type);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCategory(null);
    setModalType(null);
  };

  // Find the maximum volume value for scaling the bars
  const maxVolume = purchasingCategories.length > 0 
    ? Math.max(...purchasingCategories.map(cat => cat.volumeValue))
    : 1; // Default to 1 if no data yet

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="text-xl">Loading purchase data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <div className="text-sm text-gray-500">Purchasing</div>
        <h1 className="text-3xl font-bold text-gray-700">Top Purchase Categories</h1>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Food Procurement Analysis</h2>
        <p className="text-gray-600">Which food categories drive the most Purchasing Value? See the breakdown of spending by category.</p>
      </div>

      {purchasingCategories.length === 0 ? (
        <div className="text-center p-4">
          <p>No purchasing data available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Purchasing Category</th>
                <th className="p-3 text-left">Purchasing Volume</th>
                <th className="p-3 text-left">Purchasing Volume by Item →</th>
                <th className="p-3 text-left">Purchasing Volume by Supplier</th>
              </tr>
            </thead>
            <tbody>
              {purchasingCategories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 w-1/5">{category.name}</td>
                  <td className="p-3 w-1/5">
                    <div className="flex items-center">
                      <div className="w-20 min-w-[80px]">{category.volume}</div>
                      <div className="flex-1 bg-gray-200 h-4 ml-2 rounded-sm">
                        <div 
                          className="bg-amber-300 h-4 rounded-sm" 
                          style={{ width: `${(category.volumeValue / maxVolume) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 w-1/5">
                    <div 
                      className="bg-amber-100 p-2 rounded cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => openModal(category.id, 'items')}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Highest Volume Item</div>
                          <span className="font-medium">{getTopItem(category.id).name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{getTopItem(category.id).volume}</span>
                          <div className="text-xs text-blue-600 mt-1">View All ↗</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 w-1/5">
                    <div 
                      className="bg-amber-100 p-2 rounded cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => openModal(category.id, 'suppliers')}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Highest Volume Supplier</div>
                          <span className="font-medium">{getTopSupplier(category.id).name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{getTopSupplier(category.id).volume}</span>
                          <div className="text-xs text-blue-600 mt-1">View All ↗</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for displaying all items/suppliers */}
      {selectedCategory && modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalType === 'items' 
                  ? `All Items for ${purchasingCategories.find(c => c.id === selectedCategory)?.name}` 
                  : `All Suppliers for ${purchasingCategories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">{modalType === 'items' ? 'Item Name' : 'Supplier Name'}</th>
                  <th className="p-3 text-left">Volume</th>
                  <th className="p-3 text-left">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {modalType === 'items' 
                  ? itemsByCategory[selectedCategory]?.map(item => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.volume}</td>
                        <td className="p-3">{new Date(item.purchaseDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</td>
                      </tr>
                    ))
                  : suppliersByCategory[selectedCategory]?.map(supplier => (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{supplier.name}</td>
                        <td className="p-3">{supplier.volume}</td>
                        <td className="p-3">{new Date(supplier.purchaseDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPurchaseCategories;
