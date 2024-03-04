import React, { useState } from 'react';
import TransactionsTable from "./components/TransactionsTable"
import StatisticsBox from './components/StatisticsBox';
import PriceRangeChart from './components/PriceRangeChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">

<TransactionsTable />
      <label htmlFor="month">Select Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <StatisticsBox selectedMonth={selectedMonth} />
      <PriceRangeChart />
    
    </div>
  );
};

export default App;
