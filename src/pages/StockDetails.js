import React, { useState } from 'react';
import axios from 'axios';
import StockChart from '../utils/StockChart';
import { stocksDataList } from './stocksDataList'

const StockDetails = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(stocksDataList);

  const apiKey = 'AAMUKLV56767876P'; // Replace with your actual API key
  const intervals = ["1min", "5min", "15min", "30min", "60min"];

  const fetchStockData = async () => {
    if (!selectedSymbol) return;

    const interval = '5min';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedSymbol}&interval=${interval}&apikey=${apiKey}`;

    try {
      setLoading(true);
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

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter stock list based on search term (by name or symbol)
    const filtered = stocksDataList.filter(stock => 
      stock.name.toLowerCase().includes(term) || stock.symbol.toLowerCase().includes(term)
    );
    setFilteredStocks(filtered);
  };

  // Handle selecting a stock from the dropdown
  const handleSelectStock = (symbol) => {
    setSelectedSymbol(symbol);
    setSearchTerm(''); // Clear the search field after selecting
    setFilteredStocks([]); // Hide the dropdown after selection
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Stock Details</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stock by name or symbol"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full"
        />
        {searchTerm && (
          <ul className="border rounded mt-2 max-h-48 overflow-y-auto">
            {filteredStocks.map(stock => (
              <li
                key={stock.symbol}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleSelectStock(stock.symbol)}
              >
                {stock.name} ({stock.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSymbol && (
        <div className="mb-4">
          <p>Selected Symbol: <strong>{selectedSymbol}</strong></p>
          <button
            onClick={fetchStockData}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Fetch Data
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <StockChart stockData={stockData} />
      )}
    </div>
  );
};

export default StockDetails;
