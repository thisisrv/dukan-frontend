// App.js
import React from 'react';
import './App.css';
import Inventory from './components/inventory';
import Sales from './components/sales';
import AddSales from "./components/AddSale";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import getSales from './components/getSales';

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
function App() {

  return (
  <Router>
      <div className="container" >
  
        <Routes>
          <Route path="/inventory/" Component={Inventory}></Route>
          <Route path='/inventory/addProduct' Component={AddProduct}></Route>
          <Route path="/sales" Component={Sales}></Route>
          <Route path="/sales/addsales" Component={AddSales}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path="/sales/getSales" Component={getSales}></Route>
        </Routes>
      </div>
  </Router>

  );
}

export default App;
