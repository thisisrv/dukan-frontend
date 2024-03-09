// TotalTable.js
import React from 'react';

function TotalTable({ addedItems }) {
  const totalItems = addedItems.reduce((total, item) => total + item.quantity, 0);
  const totalCostPrice = addedItems.reduce((total, item) => total + item.cost_price, 0);
  const totalSellingPrice = addedItems.reduce((total, item) => total + item.selling_price, 0);
  const totalProfit = totalSellingPrice - totalCostPrice;

  return (
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
      <button type="button" className="btn btn-success">Add Sale</button>
    </div>
  );
}

export default TotalTable;
