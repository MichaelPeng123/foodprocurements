import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../misc/supabaseClient';
import Papa from 'papaparse';
import foodData from '../data/foodData';

function PriceEdits() {
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [documentYear, setDocumentYear] = useState('');
    const [state, setState] = useState('');
    const [foodCodeMap, setFoodCodeMap] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    // List of all 50 US states
    const usStates = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    useEffect(() => {
        FetchCsvData();
        // Parse the food data CSV when component mounts
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
            }
        });
    }, []);

    const FetchCsvData = async () => {
        try {
            const csvUrl = location.state?.csvUrl;
            const csvFileName = location.state?.csvFileName;
            console.log("CSV URL: ", csvUrl);
            console.log("CSV File Name: ", csvFileName);
            
            if (!csvUrl) {
                console.error("No CSV URL provided");
                return;
            }

            const response = await fetch(`http://localhost:5005/get-csv?csvUrl=${encodeURIComponent(csvUrl)}&csvFileName=${encodeURIComponent(csvFileName)}`);
            const data = await response.json();
            if (data.status === 'success') {
                const rows = data.data;
                setHeaders(rows[0]);
                setCsvData(rows.slice(1));
            }
        } catch (error) {
            console.error('Error fetching CSV:', error);
        }
    };

    const handleCellEdit = (rowIndex, colIndex, value) => {
        const newData = [...csvData];
        newData[rowIndex][colIndex] = value;
        setCsvData(newData);
    };

    const saveChanges = async () => {
        try {
            const csvFileName = location.state?.csvFileName;
            const response = await fetch('http://localhost:5005/save-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [headers, ...csvData],
                    csvFileName: csvFileName
                }),
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert('Changes saved successfully!');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes');
        }
    };

    const sendToSupabase = async () => {
        try {
            setUploading(true);
            
            // Process each row of CSV data
            const foodItems = csvData.map(row => {
                const foodItem = headers.reduce((obj, header, index) => {
                    obj[header.trim()] = row[index];
                    return obj;
                }, {});

                // Look up food code translation
                const code = (foodItem.Foodcode || foodItem.Food_Code || '').toString().trim();
                const foodInfo = foodCodeMap[code] || {};

                return {
                    Description: foodItem.Description || '',
                    Pack: parseInt(foodItem.Pack) || 0,
                    Pack_size: foodItem["Pack Size"] || '',
                    Price: parseFloat(foodItem.Price) || 0,
                    Price_per_pack: parseFloat(foodItem["Price Per Pack"]) || 0,
                    Per_per_pack_size: parseFloat(foodItem["Price Per Pack Size"]) || 0,
                    Price_per_lb: parseFloat(foodItem["Price Per Lb"]) || 0,
                    Quantity: parseInt(foodItem.Quantity) || 0,
                    Size: parseInt(foodItem.Size) || 0,
                    UOM: foodItem.UOM || '',
                    Document_year: parseInt(documentYear) || new Date().getFullYear(),
                    School_name: schoolName || 'Unknown',
                    State: state || 'Unknown',
                    Food_Code: parseInt(code) || null,
                    item_category: foodInfo.description || '',
                    food_group: foodInfo.foodgroups || '',
                    food_subgroup: foodInfo.foodsubgroups || '',
                    created_at: new Date().toISOString()
                };
            });
            
            // Insert data into Supabase
            const { data, error } = await supabase
                .from('food_data')
                .insert(foodItems)
                .select();
            
            if (error) throw error;
            
            alert(`Successfully uploaded ${data.length} items to the database!`);
            navigate('/food-database');
        } catch (error) {
            console.error('Error uploading to Supabase:', error);
            alert('Error uploading to Supabase: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const downloadCSV = () => {
        // Create a new header row with additional columns
        const enhancedHeaders = ['School Name', 'State', 'Document Year', ...headers];
        
        // Add school name, state and year to each row of data
        const enhancedData = csvData.map(row => [schoolName, state, documentYear, ...row]);
        
        // Combine enhanced headers and data
        const fullData = [enhancedHeaders, ...enhancedData];
        
        // Convert to CSV format
        const csvContent = fullData.map(row => row.join(',')).join('\n');
        
        // Create a Blob with the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        
        // Set the download filename - use the original filename if available or a default name
        // Include school name, state, and year in the filename if provided
        let csvFileName = location.state?.csvFileName || 'data.csv';
        if (schoolName && state && documentYear) {
            // Remove .csv extension if present
            csvFileName = csvFileName.replace('.csv', '');
            csvFileName = `${csvFileName}_${schoolName}_${state}_${documentYear}.csv`;
        }
        
        link.href = url;
        link.setAttribute('download', csvFileName);
        
        // Append to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Release the URL object
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Price Edits</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2 bg-gray-100">
                                    {header}
                                </th>
                            ))}
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Item Category</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Food Group</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Food Subgroup</th>
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => {
                            // Find the index of the Foodcode column
                            const foodCodeIndex = headers.findIndex(h => h.trim().toLowerCase() === 'foodcode' || h.trim().toLowerCase() === 'food_code');
                            const code = foodCodeIndex !== -1 ? (row[foodCodeIndex] || '').toString().trim() : '';
                            const foodInfo = foodCodeMap[code] || {};
                            return (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td 
                                            key={colIndex} 
                                            className="border border-gray-300 px-4 py-2"
                                            onClick={() => setEditingCell({ row: rowIndex, col: colIndex })}
                                        >
                                            {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                                                <input
                                                    type="text"
                                                    value={cell}
                                                    onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                                                    onBlur={() => setEditingCell(null)}
                                                    autoFocus
                                                    className="w-full p-1"
                                                />
                                            ) : (
                                                cell
                                            )}
                                        </td>
                                    ))}
                                    <td className="border border-gray-300 px-4 py-2">{foodInfo.description || 'N/A'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{foodInfo.foodgroups || 'N/A'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{foodInfo.foodsubgroups || 'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 mb-4">
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                            School Name
                        </label>
                        <input
                            type="text"
                            id="schoolName"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter school name"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <select
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-- Select State --</option>
                            {usStates.map(stateCode => (
                                <option key={stateCode} value={stateCode}>{stateCode}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="documentYear" className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                        </label>
                        <input
                            type="text"
                            id="documentYear"
                            value={documentYear}
                            onChange={(e) => setDocumentYear(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter document year"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4 space-x-4">
                <button 
                    onClick={saveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Save Changes
                </button>
                <button 
                    onClick={sendToSupabase}
                    disabled={uploading}
                    className={`px-4 py-2 rounded transition-colors ${
                        uploading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                >
                    {uploading ? 'Uploading...' : 'Send to Database'}
                </button>
                <button 
                    onClick={downloadCSV}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                >
                    Download CSV
                </button>
            </div>
        </div>
    );
}

export default PriceEdits; 