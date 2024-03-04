import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatisticsBox = ({ selectedMonth }) => {
 const [statistics, setStatistics] = useState(null);
 const Api="https://roxcilersystemsbackend.onrender.com"

 useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${Api}/statistics`, {
          params: {
            month: selectedMonth,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    if (selectedMonth) {
      fetchStatistics();
    }
 }, [selectedMonth]);

 if (!selectedMonth) {
    return null;
 }

 return (
    <div className="border border-gray-300 p-4 mt-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Statistics for {selectedMonth}</h3>
      {statistics ? (
        <>
          <p className="text-sm text-gray-600">Total Sale Amount: <span className="font-bold text-gray-800">{statistics.totalSaleAmount}</span></p>
          <p className="text-sm text-gray-600">Total Sold Items: <span className="font-bold text-gray-800">{statistics.totalSoldItems}</span></p>
          <p className="text-sm text-gray-600">Total Not Sold Items: <span className="font-bold text-gray-800">{statistics.totalNotSoldItems}</span></p>
        </>
      ) : (
        <p className="text-sm text-gray-600">Loading...</p>
      )}
    </div>
 );
};

export default StatisticsBox;
