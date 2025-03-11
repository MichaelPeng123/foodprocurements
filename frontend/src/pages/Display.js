import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Row, Col, Form, Table, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import foodData from '../data/foodData';

const Display = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Parse the CSV data from the imported foodData variable
      Papa.parse(foodData, {
        header: true,
        delimiter: ",",
        quoteChar: '"',
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          
          // Extract unique categories from foodgroups column
          const uniqueCategories = [...new Set(results.data.map(item => item.foodgroups))].filter(Boolean);
          setCategories(uniqueCategories);
          
          setFilteredData(results.data);
          setLoading(false);
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(`Error processing data: ${err.message}`);
      setLoading(false);
    }
  }, []);

  // Filter data when category selection changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.foodgroups === selectedCategory));
    }
  }, [selectedCategory, data]);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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

  // Get column headers from the first data item
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Food Index Data</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <div className="mt-3">
        <p>Showing {filteredData.length} of {data.length} items</p>
      </div>
    </Container>
  );
};

export default Display;
