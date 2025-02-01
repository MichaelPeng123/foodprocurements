import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../misc/firebase';
import { collection, addDoc } from 'firebase/firestore';

function PriceEdits() {
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const [uploading, setUploading] = useState(false);
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
            </div>
        </div>
    );
}

export default PriceEdits; 