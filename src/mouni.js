import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchTerm, sortBy]);

  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(/api/customers?page=${page}&search=${searchTerm}&sortBy=${sortBy});
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSort = event => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <h1>Customer List</h1>
      <input type="text" placeholder="Search by Name or Location" onChange={handleSearch} />
      <select onChange={handleSort}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Created Date</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
