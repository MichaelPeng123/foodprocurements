import React from 'react';

export default function ItemSummary({ itemData }) {
  // Helper function to render star ratings with value
  const renderStars = (rating, value, max = 5) => {
    return (
      <div>
        <div className="flex items-center mb-1">
          {[...Array(max)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-blue-500' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="text-black text-xl font-bold">{value}</div>
      </div>
    );
  };

  const renderRedStars = (rating, value, max = 5) => {
    return (
      <div>
        <div className="flex items-center mb-1">
          {[...Array(max)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-red-500' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="text-black text-xl font-bold">{value}</div>
      </div>
    );
  };

  const renderBlackStars = (rating, value, max = 5) => {
    return (
      <div>
        <div className="flex items-center mb-1">
          {[...Array(max)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-gray-800' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="text-black text-xl font-bold">{value}</div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">{itemData.name}</h1>
          <p className="text-gray-600">Category: {itemData.category}</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Filter
          </button>
        </div>
      </div>
      
      {/* Metrics section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-2 font-medium">Purchasing Volume</p>
          {renderStars(itemData.purchasingVolume, itemData.purchasingVolumeValue)}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-2 font-medium">Average Purchase Price</p>
          {renderRedStars(itemData.averagePurchasePrice, itemData.averagePurchasePriceValue)}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-2 font-medium">Other SFAs Price Range</p>
          {renderBlackStars(itemData.otherSFAsPriceRating, itemData.otherSFAsPriceRange)}
        </div>
      </div>
    </div>
  );
}