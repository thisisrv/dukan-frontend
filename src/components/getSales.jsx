import React, { useState } from 'react';
import ResponseTable from './responseTable';
import { Link } from 'react-router-dom';


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
                type="text"
                id="dateInput"
                className="form-control"
                value={date}
                onChange={handleChange}
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