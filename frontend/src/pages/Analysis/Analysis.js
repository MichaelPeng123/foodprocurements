import React, { useState, useEffect } from 'react';
import ItemSummary from './AnalysisComponents/ItemSummary';
import YourPurchases from './AnalysisComponents/YourPurchases';
import OtherSFAComparisons from './AnalysisComponents/OtherSFAComparisons';
import CostAnalysis from './AnalysisComponents/CostAnalysis';

export default function Analysis() {
  const [analysisData, setAnalysisData] = useState(null);
  
  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('analysisData');
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
    }
  }, []);

  // Item metadata - now uses data from API if available
  const itemData = analysisData ? {
    name: analysisData.items?.length > 0 ? analysisData.items[0].item_category : "All Items",
    category: analysisData.items?.length > 0 ? analysisData.items[0].food_subgroup : "N/A",
    purchasingVolume: 3,
    purchasingVolumeValue: analysisData.metrics?.purchasing_volume ? `$${analysisData.metrics.purchasing_volume.toLocaleString()}` : "$24,560",
    averagePurchasePrice: 2,
    averagePurchasePriceValue: analysisData.metrics?.avg_purchase_price ? `$${analysisData.metrics.avg_purchase_price.toFixed(2)}/lb` : "$2.45/lb",
    otherSFAsPriceRating: 3,
    otherSFAsPriceRange: analysisData.metrics?.other_sfa_max ? 
      `$${analysisData.metrics.other_sfa_min.toFixed(2)} - $${analysisData.metrics.other_sfa_max.toFixed(2)}/lb` : 
      "$1.95 - $2.85/lb"
  } : {
    name: "Fresh Vegetables - Carrots",
    category: "Fresh Produce",
    purchasingVolume: 3,
    purchasingVolumeValue: "$24,560",
    averagePurchasePrice: 2,
    averagePurchasePriceValue: "$2.45/lb",
    otherSFAsPriceRating: 3,
    otherSFAsPriceRange: "$1.95 - $2.85/lb"
  };
  
  // Your purchases data - use data from API if available
  const yourPurchases = analysisData ? analysisData.items.map(item => ({
    itemDescription: item.Description || 'N/A',
    year: item.Document_year || 'N/A',
    quantity: item.Quantity ? `${item.Quantity.toLocaleString()} lbs` : 'N/A',
    purchaseAmount: item.Price ? `$${item.Price.toLocaleString()}` : 'N/A',
    pricePerLb: item.Price_per_lb ? `$${item.Price_per_lb}` : 'N/A'
  })) : [
    { 
      itemDescription: "Organic Carrots", 
      year: 2025, 
      quantity: "2,500 lbs", 
      purchaseAmount: "$6,125", 
      pricePerLb: "$2.45" 
    },
    { 
      itemDescription: "Baby Carrots", 
      year: 2024, 
      quantity: "1,850 lbs", 
      purchaseAmount: "$4,810", 
      pricePerLb: "$2.60" 
    },
    { 
      itemDescription: "Rainbow Carrots", 
      year: 2023, 
      quantity: "1,200 lbs", 
      purchaseAmount: "$3,240", 
      pricePerLb: "$2.70" 
    },
    { 
      itemDescription: "Local Farm Carrots", 
      year: 2023, 
      quantity: "2,100 lbs", 
      purchaseAmount: "$4,935", 
      pricePerLb: "$2.35" 
    },
    { 
      itemDescription: "Jumbo Carrots", 
      year: 2022, 
      quantity: "2,374 lbs", 
      purchaseAmount: "$5,460", 
      pricePerLb: "$2.30" 
    }
  ];
  
  // Your purchase metrics - use data from API if available
  const yourPurchaseMetrics = analysisData ? {
    avgPurchasePrice: analysisData.metrics?.avg_purchase_price ? `$${analysisData.metrics.avg_purchase_price.toFixed(2)}/lb` : "$2.45/lb",
    totalVolume: analysisData.metrics?.purchasing_volume ? `$${analysisData.metrics.purchasing_volume.toLocaleString()}` : "$24,560",
    totalQuantity: analysisData.metrics?.total_quantity ? `${analysisData.metrics.total_quantity.toLocaleString()} lbs` : "10,024 lbs"
  } : {
    avgPurchasePrice: "$2.45/lb",
    totalVolume: "$24,560",
    totalQuantity: "10,024 lbs"
  };
  
  // Other SFAs purchases data - use data from API if available
  const otherSFAsPurchases = analysisData ? analysisData.other_sfa_items.map(item => ({
    itemDescription: item.Description || 'N/A',
    year: item.Document_year || 'N/A',
    quantity: item.Quantity ? `${item.Quantity.toLocaleString()} lbs` : 'N/A',
    purchaseAmount: item.Price ? `$${item.Price.toLocaleString()}` : 'N/A',
    pricePerLb: item.Price_per_lb ? `$${item.Price_per_lb}` : 'N/A',
    schoolName: item.School_name || 'Unknown School'
  })) : [
    { 
      itemDescription: "Organic Carrots", 
      year: 2025, 
      quantity: "3,200 lbs", 
      purchaseAmount: "$6,240", 
      pricePerLb: "$1.95",
      schoolName: "Lincoln Elementary" 
    },
    { 
      itemDescription: "Baby Carrots", 
      year: 2024, 
      quantity: "2,800 lbs", 
      purchaseAmount: "$5,320", 
      pricePerLb: "$1.90",
      schoolName: "Washington High School" 
    },
    { 
      itemDescription: "Organic Carrots", 
      year: 2024, 
      quantity: "4,100 lbs", 
      purchaseAmount: "$10,660", 
      pricePerLb: "$2.60",
      schoolName: "Roosevelt Middle School" 
    },
    { 
      itemDescription: "Local Carrots", 
      year: 2023, 
      quantity: "3,500 lbs", 
      purchaseAmount: "$6,650", 
      pricePerLb: "$1.90",
      schoolName: "Jefferson Academy" 
    },
    { 
      itemDescription: "Farm-Fresh Carrots", 
      year: 2023, 
      quantity: "2,950 lbs", 
      purchaseAmount: "$7,375", 
      pricePerLb: "$2.50",
      schoolName: "Madison Elementary" 
    },
    { 
      itemDescription: "Bulk Carrots", 
      year: 2022, 
      quantity: "5,200 lbs", 
      purchaseAmount: "$9,880", 
      pricePerLb: "$1.90",
      schoolName: "Hamilton School District" 
    }
  ];
  
  // Get state from the first other SFA item or default to California
  const state = analysisData && analysisData.other_sfa_items.length > 0 ? 
    analysisData.other_sfa_items[0].State || "California" : "California";
  
  // Cost analysis data
  const costAnalysisData = analysisData ? {
    potentialSavingsAvg: {
      amount: analysisData.metrics?.potential_savings_avg < 0 ? 
        `-$${Math.abs(analysisData.metrics.potential_savings_avg).toLocaleString()}` : 
        `$${analysisData.metrics.potential_savings_avg.toLocaleString()}`,
      percentage: `-${Math.abs(analysisData.metrics?.potential_savings_avg / analysisData.metrics?.total_school_spend * 100)}% of total food budget`
    },
    potentialSavingsBest: {
      amount: `$${analysisData.metrics?.potential_savings_best.toLocaleString()}`,
      percentage: `${(analysisData.metrics?.potential_savings_best / analysisData.metrics?.total_school_spend * 100)}% of total food budget`
    },
    volumeComparison: {
      text: "Top 20% in State",
      percentage: 90 // Default as requested
    },
    budgetAllocation: {
      text: `${(analysisData.metrics?.budget_allocation * 100).toFixed(2)}% of Total Food Budget`,
      percentage: (analysisData.metrics?.budget_allocation * 100) || 12.5
    }
  } : {
    potentialSavingsAvg: {
      amount: "-$4,280",
      percentage: "-8.2% of total food budget"
    },
    potentialSavingsBest: {
      amount: "$6,120",
      percentage: "11.8% of total food budget"
    },
    volumeComparison: {
      text: "Top 20% in State",
      percentage: 90 // This is the fill percentage for the progress bar
    },
    budgetAllocation: {
      text: "12.5% of Total Food Budget",
      percentage: 12.5 // This is the fill percentage for the progress bar
    }
  };

  return (
    <div className="max-w-[90%] mx-auto p-8">
      <ItemSummary itemData={itemData} />
      
      <div className="mt-6">
        <CostAnalysis data={costAnalysisData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <YourPurchases purchases={yourPurchases} metrics={yourPurchaseMetrics} />
        <OtherSFAComparisons purchases={otherSFAsPurchases} state={state} />
      </div>
    </div>
  );
}
