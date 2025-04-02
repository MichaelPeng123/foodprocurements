import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import PdfUpload from './pages/PDFUpload';
import SignIn from './pages/SignIn';
import Database from './pages/Database';
import PriceEdits from './pages/PriceEdits';
import Display from './pages/Display';
import FoodDatabase from './pages/FoodDatabase';
import SupabaseTest from './pages/supabaseTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pdfupload" element={<PdfUpload />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/database" element={<Database />} />
          <Route path="/food-database" element={<FoodDatabase />} />
          <Route path="/priceEdits" element={<PriceEdits />} />
          <Route path="/display" element={<Display />} />
          <Route path="/supabaseTest" element={<SupabaseTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;