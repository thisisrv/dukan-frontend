import React from 'react';

function ResponseTable({ response }) {

  const totalItems = response.reduce((total, item) => total + item.quantity, 0);
  const totalCostPrice = response.reduce((total, item) => total + item.cost_price, 0);
  const totalSellingPrice = response.reduce((total, item) => total + item.selling_price, 0);
  const totalProfit = totalSellingPrice - totalCostPrice;

  return (
    <div className='container mt-4'>
      <h2>Sales</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Profit</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {response.map((item, index) => (
            <tr key={index}>
              <td>{item.key}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.cost_price}</td>
              <td>{item.selling_price}</td>
              <td>{item.selling_price - item.cost_price}</td>
              {/* Add more cells for additional data fields */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='container mt-4'>
          <h2>Total</h2>
          <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Items</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalItems}</td>
            <td>Rs. {totalCostPrice}</td>
            <td>Rs. {totalSellingPrice}</td>
            <td>Rs. {totalProfit}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ResponseTable;
