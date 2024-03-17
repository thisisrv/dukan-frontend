// App.js
import React from 'react';
import './App.css';
import Inventory from './components/inventory';
import Sales from './components/sales';
import AddSales from "./components/AddSale";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import getSales from './components/getSales';
import Authenticate from './authenticate/authenticate';
import Home from './authenticate/home';


function App() {

  return (
  <Router>
      <div className="container" >
  
        <Routes>
          <Route path="/inventory/" Component={Inventory}></Route>
          <Route path='/inventory/addProduct' Component={AddProduct}></Route>
          <Route path="/sales" Component={Sales}></Route>
          <Route path="/sales/addsales" Component={AddSales}></Route>
          <Route path='/dashboard' Component={Home}></Route>
          <Route path='/' Component={Authenticate}></Route>
          <Route path="/sales/getSales" Component={getSales}></Route>
        </Routes>
      </div>
  </Router>

  );
}

export default App;
