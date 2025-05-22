import React from 'react';

export default function CostAnalysis({ data }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6">Cost Analysis Summary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Potential Savings */}
        <div>
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Potential Savings (Avg. Market Price)</p>
            <p className="text-red-600 text-3xl font-semibold">{data.potentialSavingsAvg.amount}</p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-1">Potential Savings (Best Market Price)</p>
            <p className="text-green-600 text-3xl font-semibold">{data.potentialSavingsBest.amount}</p>
          </div>
        </div>
        
        {/* Right column - Volume Comparison */}
        <div>
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Volume Comparison</p>
            <p className="text-xl font-semibold mb-2">{data.volumeComparison.text}</p>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${data.volumeComparison.percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 mb-1">Budget Allocation</p>
            <p className="text-xl font-semibold mb-2">{data.budgetAllocation.text}</p>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-green-600 rounded-full" 
                style={{ width: `${data.budgetAllocation.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 