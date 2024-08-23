import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StockDetails from './pages/StockDetails';

const App = () => {
  return (
    <Router>
      <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock-details" element={<StockDetails />} />
      </Routes>
    </div>
    </Router>
    
  );
};

export default App;
