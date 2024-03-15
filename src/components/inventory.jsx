import React from "react";
import InventoryTable from "./InventoryTable"
import { useState } from "react";
import {  Link}  from 'react-router-dom';

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetInventory = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://backend.dukanwale.in/products');
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
        setLoading(false);
    };

    function deleteProduct(id){
        console.log(id)
        const updatedInventory = inventory.filter(product => product.id !== id);
        console.log(updatedInventory)
        setInventory(updatedInventory);

        //Get the new Inventory
        handleGetInventory()
    }

    function updateProduct(){
        //Get the new Inventory
        handleGetInventory()
    }

    return (
        <div >
            <h1 className="my-4 heading" >Inventory Management</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary" onClick={handleGetInventory} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Inventory'}
                </button>
                
                <Link to='/inventory/addProduct'><button className="btn btn-primary">Add Product</button></Link>
                <Link to='/'><button className="btn btn-primary">Go Back</button></Link>
            </div>


            {inventory !== null && inventory.length > 0 && <InventoryTable data={inventory} onDeleteProduct={deleteProduct} onUpdateProduct={updateProduct}/>}
            
        </div>
    );
}

export default Inventory;