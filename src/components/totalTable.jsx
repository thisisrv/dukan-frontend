// TotalTable.js
import React from 'react';

function TotalTable({ addedItems, date }) {
  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear();

  const totalItems = addedItems.reduce((total, item) => total + item.quantity, 0);
  const totalCostPrice = addedItems.reduce((total, item) => total + item.cost_price, 0);
  const totalSellingPrice = addedItems.reduce((total, item) => total + item.selling_price, 0);
  const totalProfit = totalSellingPrice - totalCostPrice;

  const handleGenerateBill = () => {
    // Create the request body including the addedItems and date
    const requestBody = {
      date: date,
      items: addedItems
    };

    // Make a POST request to your API endpoint
    fetch(`https://backend.dukanwale.in/addSale`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    }).then(response => {
        // Handle success
        console.log('Bill generated successfully:', response.data);
        // Redirect to localhost:3000/sales
        window.location.href = '/sales';
      })
      .catch(error => {
        // Handle error
        console.error('Error generating bill:', error);
      });
  };


  return (
    <div className='container mt-4'>
      <h2>Total Bill on {date}</h2>
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
      <button type="button" className="btn btn-success" onClick={handleGenerateBill}>Generate Bill</button>
    </div>
  );
}

export default TotalTable;
