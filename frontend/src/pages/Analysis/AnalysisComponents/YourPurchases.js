import React from 'react';

export default function YourPurchases({ purchases, metrics }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Purchases</h2>
      
      {/* Metrics summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600 mb-1">Avg Purchase Price</div>
          <div className="font-bold text-xl">{metrics.avgPurchasePrice}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600 mb-1">Total Volume</div>
          <div className="font-bold text-xl">{metrics.totalVolume}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600 mb-1">Total Quantity</div>
          <div className="font-bold text-xl">{metrics.totalQuantity}</div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-3 px-4 font-medium">Item Description</th>
              <th className="py-3 px-4 font-medium">Year</th>
              <th className="py-3 px-4 font-medium">Quantity</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Price/lb</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td className="py-3 px-4">{purchase.itemDescription}</td>
                <td className="py-3 px-4">{purchase.year}</td>
                <td className="py-3 px-4">{purchase.quantity}</td>
                <td className="py-3 px-4">{purchase.purchaseAmount}</td>
                <td className="py-3 px-4">{purchase.pricePerLb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 