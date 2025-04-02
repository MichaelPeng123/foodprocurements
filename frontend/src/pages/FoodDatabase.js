import React, { useState, useEffect } from 'react';
import { db } from '../misc/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Form, Table, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Papa from 'papaparse';
import foodData from '../data/foodData';

function FoodDatabase() {
  // Database state
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Category filter state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemCategories, setItemCategories] = useState([]);
  const [selectedItemCategory, setSelectedItemCategory] = useState('All');
  const [foodCodeMap, setFoodCodeMap] = useState({});

  useEffect(() => {
    // Parse the food data CSV to create a mapping of food codes to their details
    try {
      Papa.parse(foodData, {
        header: true,
        delimiter: ",",
        quoteChar: '"',
        skipEmptyLines: true,
        complete: (results) => {
          // Create a map of food codes to their details
          const foodMap = {};
          results.data.forEach(item => {
            if (item.foodcode) {
              foodMap[item.foodcode] = {
                description: item.description,
                foodgroups: item.foodgroups,
                foodsubgroups: item.foodsubgroups
              };
            }
          });
          setFoodCodeMap(foodMap);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(results.data.map(item => item.foodgroups))].filter(Boolean);
          setCategories(uniqueCategories);
          
          // Extract unique item categories (descriptions)
          const uniqueItemCategories = [...new Set(results.data.map(item => item.description))].filter(Boolean);
          setItemCategories(uniqueItemCategories);
        }
      });
    } catch (err) {
      console.error("Error parsing food data:", err);
    }
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foodData"));
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
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

    fetchFoodItems();
  }, []);

  // Filter items based on search term and selected categories
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const foodCode = item.Foodcode;
    const foodInfo = foodCodeMap[foodCode] || {};
    
    // Check if it matches the food group category filter
    const matchesFoodGroup = selectedCategory === 'All' || 
                            (foodInfo.foodgroups && foodInfo.foodgroups === selectedCategory);
    
    // Check if it matches the item category filter
    const matchesItemCategory = selectedItemCategory === 'All' || 
                               (foodInfo.description && foodInfo.description === selectedItemCategory);
    
    return matchesSearch && matchesFoodGroup && matchesItemCategory;
  });

  // Handle category filter changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleItemCategoryChange = (e) => {
    setSelectedItemCategory(e.target.value);
  };

  // Add this function to handle CSV download
  const downloadCSV = () => {
    // Convert the data to CSV format using Papa Parse
    const csv = Papa.unparse(filteredItems.map(item => {
      const foodInfo = foodCodeMap[item.Foodcode] || {};
      return {
        Description: item.Description,
        ItemCategory: foodInfo.description || 'N/A',
        FoodGroup: foodInfo.foodgroups || 'N/A',
        FoodSubgroup: foodInfo.foodsubgroups || 'N/A',
        FoodCode: item.Foodcode,
        DocumentYear: item.documentYear || 'N/A',
        SchoolDistrict: item.schoolName || 'N/A',
        Price: item.Price,
        Quantity: item.Quantity,
        PackSize: item["Pack Size"],
        Pack: item.Pack,
        Size: item.Size,
        UOM: item.UOM,
        PricePerPack: item["Price Per Pack"],
        PricePerPackSize: item["Price Per Pack Size"]
      };
    }));
    
    // Create a Blob with the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'food_database_export.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Food Procurement Database</h1>
      
      <div className="mb-6 flex flex-wrap justify-between items-end gap-4">
        {/* Search Bar - Takes more space on the left */}
        <div className="flex-grow max-w-xl relative">
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
        
        {/* Filters Container - Aligned to the right */}
        <div className="flex flex-wrap gap-4 justify-end">
          {/* Food Group Filter */}
          <div className="w-48">
            <Form.Group>
              <Form.Label className="text-sm font-medium text-gray-700">Food Group</Form.Label>
              <Form.Select 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                className="px-4 py-2 rounded-lg border border-gray-300 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          outline-none transition-colors"
              >
                <option value="All">All Food Groups</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          
          {/* Item Category Filter */}
          <div className="w-48">
            <Form.Group>
              <Form.Label className="text-sm font-medium text-gray-700">Item Category</Form.Label>
              <Form.Select 
                value={selectedItemCategory} 
                onChange={handleItemCategoryChange}
                className="px-4 py-2 rounded-lg border border-gray-300 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          outline-none transition-colors"
              >
                <option value="All">All Item Categories</option>
                {itemCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </div>

      {/* Results count and download button */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredItems.length} of {foodItems.length} items
        </div>
        
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CSV
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Subgroup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UOM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack Size</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => {
              // Get food details from the map if available
              const foodInfo = foodCodeMap[item.Foodcode] || {};
              
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{item.Description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foodInfo.description || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foodInfo.foodgroups || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foodInfo.foodsubgroups || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Foodcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.documentYear || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.schoolName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item["Pack Size"]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Pack}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.UOM}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item["Price Per Pack"]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item["Price Per Pack Size"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodDatabase;