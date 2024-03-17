import React from "react";
import {Link } from "react-router-dom";

function Home(){
    return (
          <div>
          <h1 className="my-4 heading" > Greetings from RV Enterprises</h1>
          <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/inventory"><button className="btn btn-primary" style={{ width: "100px" }}>Inventory</button></Link>
          <Link to="/sales"><button className="btn btn-success" style={{ width: "100px" }}>Sales</button></Link>
          </div>
          </div>
      );
  }

export default Home;