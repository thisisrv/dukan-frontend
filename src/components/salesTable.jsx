import React, { useState } from 'react';

function SalesTable({ addedItems, handleEditSellingPrice, handleRemoveItem }) {
  const [editItemId, setEditItemId] = useState(null);
  const [newSellingPrice, setNewSellingPrice] = useState('');

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
    setNewSellingPrice(itemId.selling_price);
  };

  const handleChangeNewSellingPrice = (e) => {
    setNewSellingPrice(e.target.value);
  };

  const handleSubmit = () => {
    if (newSellingPrice !== '') {
      handleEditSellingPrice(editItemId, parseFloat(newSellingPrice));
      setEditItemId(null);
      setNewSellingPrice('');
    }
  };

  const handleRemoveClick = (itemId) => {
    handleRemoveItem(itemId);
  };

  return (
    <table className="table mt-4">
      <thead className="thead-dark">
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Cost Price</th>
          <th>Selling Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {addedItems.map(item => (
          <tr key={item.key}>
            <td>{item.key}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.cost_price}</td>
            <td>
              {editItemId === item.key ? (
                <input type="number" value={newSellingPrice} onChange={handleChangeNewSellingPrice} />
              ) : (
                item.selling_price
              )}
            </td>
            <td>
              {editItemId === item.key ? (
                <>
                  <button className="btn btn-success mr-2" onClick={handleSubmit}>Submit</button>
                  <button className="btn btn-danger" onClick={() => setEditItemId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary mr-2" onClick={() => handleEditClick(item.key)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleRemoveClick(item.key)}>Remove</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SalesTable;
