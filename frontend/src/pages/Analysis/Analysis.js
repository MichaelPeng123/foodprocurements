import React from 'react';
import ItemSummary from './AnalysisComponents/ItemSummary';
import YourPurchases from './AnalysisComponents/YourPurchases';
import OtherSFAComparisons from './AnalysisComponents/OtherSFAComparisons';
import CostAnalysis from './AnalysisComponents/CostAnalysis';

export default function Analysis() {
  // Item metadata
  const itemData = {
    name: "Fresh Vegetables - Carrots",
    category: "Fresh Produce",
    purchasingVolume: 3,
    purchasingVolumeValue: "$24,560",
    averagePurchasePrice: 2,
    averagePurchasePriceValue: "$2.45/lb",
    otherSFAsPriceRating: 3,
    otherSFAsPriceRange: "$1.95 - $2.85/lb"
  };
  
  // Your purchases data
  const yourPurchases = [
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
  
  // Your purchase metrics
  const yourPurchaseMetrics = {
    avgPurchasePrice: "$2.45/lb",
    totalVolume: "$24,560",
    totalQuantity: "10,024 lbs"
  };
  
  // Other SFAs purchases data
  const otherSFAsPurchases = [
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
  
  // Cost analysis data
  const costAnalysisData = {
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
        <OtherSFAComparisons purchases={otherSFAsPurchases} state="California" />
      </div>
    </div>
  );
}
