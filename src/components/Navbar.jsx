import {React,useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <nav className="bg-gradient-to-r from-indigo-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">Stock Trading Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white"><button class="bg-blue-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-full w-20">
  Home
</button></Link>
          <Link to="/stock-details" className="text-white"><button class="bg-blue-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-full w-20">
    Stocks
</button></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
