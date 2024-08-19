import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockChart from '../utils/StockChart';
const StockDetails = () => {
    const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const fetchStockData = async () => {
      const apiKey = 'AAMUKLV56767876P';  
      const symbol = 'IBM';
      const interval = '5min';
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = response.data['Time Series (5min)'];
          const formattedData = Object.keys(data).map(key => ({
            time: key,
            open: data[key]['1. open'],
            high: data[key]['2. high'],
            low: data[key]['3. low'],
            close: data[key]['4. close'],
            volume: data[key]['5. volume']
          }));
          setStockData(formattedData);
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    
    
    console.log(stockData);
    const handleButtonClick = () => {
      fetchStockData();
    };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Stock Details</h2>
      <button onClick={handleButtonClick}>
          Here
      </button>
      <StockChart stockData={stockData} />
    </div>
  );
};

export default StockDetails;
