import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const StockChart = ({ stockData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Separate ref for the chart instance

  useEffect(() => {
    if (!stockData.length) return;

    const ctx = chartRef.current.getContext('2d');

    const labels = stockData.map(item => item.time).reverse();
    const openPrices = stockData.map(item => parseFloat(item.open)).reverse();
    const closePrices = stockData.map(item => parseFloat(item.close)).reverse();

    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Creating the new chart
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Open Price',
            data: openPrices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Close Price',
            data: closePrices,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)',
            },
          },
        },
      },
    });

    // Cleanup to avoid memory leaks
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [stockData]);

  return <canvas ref={chartRef} />;
};

export default StockChart;
