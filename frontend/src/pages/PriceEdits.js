import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../misc/firebase';
import { collection, addDoc } from 'firebase/firestore';

function PriceEdits() {
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [documentYear, setDocumentYear] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        FetchCsvData();
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

    const sendToFirebase = async () => {
        try {
            setUploading(true);
            const foodDataRef = collection(db, 'foodData');
            
            // Process each row of CSV data
            for (const row of csvData) {
                const foodItem = headers.reduce((obj, header, index) => {
                    obj[header.trim()] = row[index];
                    return obj;
                }, {});
                
                // Add school name and year to each document
                foodItem.schoolName = schoolName;
                foodItem.documentYear = documentYear;
                foodItem.createdAt = new Date();
                await addDoc(foodDataRef, foodItem);
            }
            
            alert('Successfully uploaded data to Firebase!');
            navigate('/database');
        } catch (error) {
            console.error('Error uploading to Firebase:', error);
            alert('Error uploading to Firebase: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const downloadCSV = () => {
        // Create a new header row with school name and year columns
        const enhancedHeaders = ['School Name', 'Document Year', ...headers];
        
        // Add school name and year to each row of data
        const enhancedData = csvData.map(row => [schoolName, documentYear, ...row]);
        
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
        // Include school name and year in the filename if provided
        let csvFileName = location.state?.csvFileName || 'data.csv';
        if (schoolName && documentYear) {
            // Remove .csv extension if present
            csvFileName = csvFileName.replace('.csv', '');
            csvFileName = `${csvFileName}_${schoolName}_${documentYear}.csv`;
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
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => (
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
                            </tr>
                        ))}
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
                    onClick={sendToFirebase}
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