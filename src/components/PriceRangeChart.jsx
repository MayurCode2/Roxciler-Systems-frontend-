import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, Tooltip, Legend, Title, LinearScale } from "chart.js";

ChartJS.register(CategoryScale, BarElement, Tooltip, Legend, Title, LinearScale);

const PriceRangeChart = () => {
 const [month, setMonth] = useState('January');
 const [chartData, setChartData] = useState({});
 const Api="https://roxcilersystemsbackend.onrender.com"

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Api}/chart?month=${month}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const labels = data.map(item => item.range);
          const counts = data.map(item => item.count);

          setChartData({
            labels: labels,
            datasets: [{
              label: 'Price Range',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
 }, [month]);

 const handleMonthChange = (e) => {
    setMonth(e.target.value);
 };

 return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-700">Select Month:</label>
        <select id="month" value={month} onChange={handleMonthChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md">
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <div className="bg-white shadow-md rounded-md p-4">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      ) : (
        <p className="text-gray-500">Loading chart data...</p>
      )}
    </div>
 );
};

export default PriceRangeChart;
