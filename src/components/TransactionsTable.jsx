import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
 const [transactions, setTransactions] = useState([]);
 const [month, setMonth] = useState("");
 const [searchText, setSearchText] = useState("");
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(0);
 const Api="https://roxcilersystemsbackend.onrender.com"

 useEffect(() => {
    fetchTransactions();
 }, [searchText, page, month]);

 const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${Api}/transactions`, {
        params: {
          month: month || undefined,
          search: searchText,
          page,
          perPage: 10,
        },
      });
      setTransactions(response.data.paginatedTransactions);
      setTotalPages(response.data.statistics.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
 };

 const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setMonth("");
 };

 const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setSearchText("");
 };

 const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setSearchText("");
 };

 const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
    setSearchText("");
 };

 // Simple date formatting function
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
 };

 // Function to display sold status
 const displaySoldStatus = (sold) => {
    return sold ? "Yes" : "No";
 };

 return (
    <div className="container mx-auto px-4 py-8">
      <label className="block mb-2 text-lg font-semibold" htmlFor="month">
        Select Month:
      </label>
      <select
        id="month"
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="">All</option>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <input
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Search transactions"
        value={searchText}
        onChange={handleSearchChange}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Date of Sale</th>
            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500">Sold Item</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {transaction.id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {transaction.title}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {transaction.price}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {transaction.description}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {transaction.category}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {formatDate(transaction.dateOfSale)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {displaySoldStatus(transaction.sold)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
 );
};

export default TransactionsTable;
