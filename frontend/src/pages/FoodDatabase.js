import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import foodData from '../data/foodData';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://bbbhdeehblyakaojszzy.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiYmhkZWVoYmx5YWthb2pzenp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjk5MzMsImV4cCI6MjA1OTIwNTkzM30.3NTqO6GVztVJ3cxlbiXDTp2eDqaVpoPwi2Bey5yt074";
const supabase = createClient(supabaseUrl, supabaseKey);

function FoodDatabase() {
  const navigate = useNavigate();
  // Database state
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Add year range filter state
  const [yearRange, setYearRange] = useState({ min: 2018, max: 2023 });
  // New: For category filters, get unique values from DB data
  const [itemCategories, setItemCategories] = useState([]);
  const [selectedItemCategory, setSelectedItemCategory] = useState('All');
  const [foodGroups, setFoodGroups] = useState([]);
  const [foodSubgroups, setFoodSubgroups] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Fetch data from Supabase
        const { data, error: supabaseError } = await supabase
          .from('food_data')
          .select('*');
        if (supabaseError) throw supabaseError;
        setFoodItems(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch food items: " + (err.message || "Unknown error"));
        setLoading(false);
      }
    };

    // Extract unique categories from foodData.js for dropdowns
    const parseCategoriesFromFoodData = () => {
      const lines = foodData.split('\n');
      const headers = lines[0].split(',');
      const foodGroupSet = new Set();
      const foodSubgroupSet = new Set();
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row.length < 4) continue;
        const foodGroup = row[2]?.trim();
        const foodSubgroup = row[3]?.trim();
        if (foodGroup) foodGroupSet.add(foodGroup);
        if (foodSubgroup) foodSubgroupSet.add(foodSubgroup);
      }
      setFoodGroups(["All", ...Array.from(foodGroupSet)]);
      setFoodSubgroups(["All", ...Array.from(foodSubgroupSet)]);
    };

    fetchFoodItems();
    parseCategoriesFromFoodData();
  }, []);

  // Filter items based on search term, item category, and year range
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesItemCategory = selectedItemCategory === 'All' || (item.item_category && item.item_category === selectedItemCategory);
    const year = parseInt(item.Document_year, 10);
    const matchesYear = !isNaN(year) && year >= yearRange.min && year <= yearRange.max;
    return matchesSearch && matchesItemCategory && matchesYear;
  });

  // Handle category filter changes
  const handleItemCategoryChange = (e) => {
    setSelectedItemCategory(e.target.value);
  };

  // Add function to handle navigation to analysis page
  const handleRunQuery = () => {
    // Send filter parameters to backend API
    const filterParams = {
      selectedItemCategory,
      yearRange,
      schoolName: "FUHSD_TEST"
    };
    axios.post('http://localhost:5005/api/filter-query', filterParams)
      .then(response => {
        // Store the response data in localStorage
        localStorage.setItem('analysisData', JSON.stringify(response.data));
        navigate('/analysis');
      })
      .catch(error => {
        console.error('Error fetching analysis data:', error);
        navigate('/analysis');
      });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading food database...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Food Procurement Database</h1>
      <div className="mb-6 flex flex-wrap justify-between items-end gap-4">
        {/* Search Bar */}
        <div className="flex-grow max-w-xl relative">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 \
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \
                     outline-none transition-colors"
          />
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-end">
          {/* Item Category Filter */}
          <div className="w-48">
            <Form.Group>
              <Form.Label className="text-sm font-medium text-gray-700">Item Category</Form.Label>
              <Form.Select 
                value={selectedItemCategory} 
                onChange={handleItemCategoryChange}
                className="px-4 py-2 rounded-lg border border-gray-300 \
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \
                          outline-none transition-colors"
              >
                <option value="All">All Item Categories</option>
                {[...new Set(foodItems.map(item => item.item_category).filter(Boolean))].map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          {/* Year Range Filter */}
          <div className="flex items-end gap-2">
            <Form.Group>
              <Form.Label className="text-sm font-medium text-gray-700">Year Min</Form.Label>
              <Form.Control
                type="number"
                min="2010"
                max={yearRange.max}
                value={yearRange.min}
                onChange={e => setYearRange({ ...yearRange, min: Number(e.target.value) })}
                className="px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </Form.Group>
            <span className="pb-2">to</span>
            <Form.Group>
              <Form.Label className="text-sm font-medium text-gray-700">Year Max</Form.Label>
              <Form.Control
                type="number"
                min={yearRange.min}
                max="2025"
                value={yearRange.max}
                onChange={e => setYearRange({ ...yearRange, max: Number(e.target.value) })}
                className="px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </Form.Group>
          </div>
        </div>
      </div>
      {/* Results count and download button */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredItems.length} of {foodItems.length} items
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRunQuery}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Run Query
          </button>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UOM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Pack Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Lb</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.Description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.item_category || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.food_group || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.food_subgroup || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Food_Code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Document_year || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.School_name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.State || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Pack_size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Pack}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.UOM}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Price_per_pack}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Per_per_pack_size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Price_per_lb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodDatabase;