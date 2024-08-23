import {React,useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <nav className="bg-gradient-to-r from-indigo-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">Stock Trading Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white"><button className="bg-black ">Home</button></Link>
          <Link to="/stock-details" className="text-white">Stock Details</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
