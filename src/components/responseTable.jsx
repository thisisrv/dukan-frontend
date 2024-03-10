import React from 'react';

function ResponseTable({ response }) {
  return (
    <div>
      <h2>Response</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Data 1</th>
            <th>Data 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {response.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.data1}</td>
              <td>{item.data2}</td>
              {/* Add more cells for additional data fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponseTable;
