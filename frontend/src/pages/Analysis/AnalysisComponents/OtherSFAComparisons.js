import React from 'react';

export default function OtherSFAComparisons({ purchases, state }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Purchases from Other SFAs</h2>
        <p className="text-gray-600">Showing data from your state ({state})</p>
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