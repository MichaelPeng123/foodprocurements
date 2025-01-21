import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PriceEdits() {
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const location = useLocation();

    useEffect(() => {
        FetchCsvData();
    }, []);

    const FetchCsvData = async () => {
        try {
            const csvUrl = location.state?.csvUrl;
            console.log("CSV URL: ", csvUrl);
            
            if (!csvUrl) {
                console.error("No CSV URL provided");
                return;
            }

            const response = await fetch(`http://localhost:5005/get-csv?csvUrl=${encodeURIComponent(csvUrl)}`);
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
            const response = await fetch('http://localhost:5005/save-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [headers, ...csvData]
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
            <button 
                onClick={saveChanges}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Save Changes
            </button>
        </div>
    );
}

export default PriceEdits; 