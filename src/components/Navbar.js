import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl">Stock Trading Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/stock-details" className="text-white">Stock Details</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
