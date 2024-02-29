// InventoryTable.js
import React from 'react';

function InventoryTable({ data }) {
  return (
    <div className="table-responsive">
      <h2 className="mb-4">Inventory</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Rs{item.cost_price.toFixed(2)}</td>
              <td>Rs{item.selling_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
