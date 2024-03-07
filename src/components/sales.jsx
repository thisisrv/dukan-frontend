import React from "react";
import {  Link}  from 'react-router-dom';

function Sales(){
    return (
        <div className="mt-4">
        <h1 className="heading">Welcome to Sales Section</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to='/sales/getSales'><button className="btn btn-primary">Get Sales</button></Link>
            <Link to='/sales/addSales'><button className="btn btn-primary">Add Sales</button></Link>
            <Link to='/'><button className="btn btn-success">Go Back</button></Link>
        </div>
        </div>
    );
}

export default Sales;