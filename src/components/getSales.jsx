import React, { useState } from 'react';
import ResponseTable from './responseTable';


function GetSales(){
    const [date, setDate] = useState('');
    const [responseData, setResponseData] = useState(null)

    const handleChange = event => {
      setDate(event.target.value);
    };
    

    const handleSubmit = async e => {
        e.preventDefault();
        try {
          // Make a GET request to your API endpoint with formattedDate
          const response = await fetch("http://localhost:8000/sales/" + date);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResponseData(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
    return (
        <div>
          <h2>Select a Date</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dateInput">Enter Date (3-3-2024 OR 12-4-2024):</label>
              <input
                type="text"
                id="dateInput"
                className="form-control"
                value={date}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {responseData !== null && <ResponseTable response={responseData}/>}
        </div>
      );
}

export default GetSales;