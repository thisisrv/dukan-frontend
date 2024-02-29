import React from "react";
import InventoryTable from "./InventoryTable"
import { useState } from "react";
import AddProduct from "./AddProduct";
import {  BrowserRouter as Router, Link, Route , Routes}  from 'react-router-dom';

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetInventory = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/products');
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
        setLoading(false);
    };

    // const handleAddProduct = () => {
    //     // After adding a product, refresh the inventory
    //     handleGetInventory();
    // };

    return (
        <div >
            <h1 className="my-4 heading" >Inventory Management</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary" onClick={handleGetInventory} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Inventory'}
                </button>
                <Link to='/inventory/addProduct'><button className="btn btn-primary">Add Product</button></Link>
            </div>


            {inventory.length > 0 && <InventoryTable data={inventory} />}
            
        </div>
    );
}

export default Inventory;