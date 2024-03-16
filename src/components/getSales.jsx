import React, { useState } from 'react';
import ResponseTable from './responseTable';
import { Link } from 'react-router-dom';


function GetSales(){
    const [responseData, setResponseData] = useState(null)

    const [date, setDate] = useState('');

    const handleDateChange = (event) => {
      setDate(event.target.value);
    };
    

    const handleSubmit = async e => {
        e.preventDefault();
        try {
          // Make a GET request to your API endpoint with formattedDate
          const response = await fetch("https://backend.dukanwale.in/sales/" + date);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResponseData(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    function handleReset(){
        setDate('')
        setResponseData(null)
    }
    return (
        <div>
          <h2>Select a Date</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dateInput">Enter Date (3-3-2024 OR 12-4-2024):</label>
              <input
              type="date"
              className="form-control"
              id="dateInput"
              value={date}
              onChange={handleDateChange}
            />
            </div>

            <div className='d-flex justify-content-between align-items-center mt-3'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="submit" className="btn btn-primary" onClick={handleReset}>Reset</button>
                <Link to="/sales"><button type="submit" className="btn btn-primary">Go Back</button></Link>
            </div>
          </form>
          {responseData !== null && <ResponseTable response={responseData}/>}
        </div>
      );
}

export default GetSales;