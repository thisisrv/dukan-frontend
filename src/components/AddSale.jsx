import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddSales() {
  const currentDate = new Date();
  const day = currentDate.getDate(); // Get the day of the month (1-31)
  const month = currentDate.getMonth() + 1; // Get the month (0-11), add 1 to get the correct month (1-12)
  const year = currentDate.getFullYear(); // Get the year (e.g., 2022)
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [addedItems, setAddedItems] = useState([]); // List of added items
  
  useEffect(() => {
    // Fetch products from backend API
    axios.get('http://localhost:8000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };
  

  function handleAddProduct(){
    // Add product to the list of added items
    const product = products.find(p => p.name === selectedProduct);
    console.log(product)
    if (product) {
      const newItem = {
        key: product._id,
        name: product.name,
        quantity: quantity,
        cost_price: quantity * product.cost_price,
        selling_price: quantity * product.selling_price
      };
      setAddedItems([...addedItems, newItem]);
      setSelectedProduct('');
      setQuantity(1);
    }
  }

  function handleEditSellingPrice(itemId){
    
  }

  function handleRemoveItem(itemid){

    const updatedAddedItems = addedItems.filter(items => items.id !== itemid);
    setAddedItems(updatedAddedItems)

  }
  return (
    <div className="container mt-4">
      <h1>Record Sales ({day + "-" + month + "-" + year})</h1>
      <form>
        <label htmlFor="product">Select Product:</label>
        <select className="form-control mb-2" id="product" value={selectedProduct} onChange={handleProductChange}>
          <option value="">Select a product...</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" className="form-control mb-2" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" />
        <button type="button" onClick={handleAddProduct} className="btn btn-primary">Add Product</button>
      </form>
      {addedItems.length > 0 && (
        <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Action</th> {/* Add a new column for the button */}
          </tr>
        </thead>
        <tbody>
          {addedItems.map(item => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.cost_price}</td>
              <td>{item.selling_price}</td>
              <td> {/* Button column */}
              <div className="btn-group" role="group">
                <button className="btn btn-danger" onClick={() => handleEditSellingPrice(item.key)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleRemoveItem(item.key)}>Remove</button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

        <div className='container mt-4'>
            <h2>Total</h2>
            <table className="table mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Items</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{addedItems.reduce((total, item) => total + item.quantity, 0)}</td>
                        <td>Rs. {addedItems.reduce((total, item) => total + item.cost_price, 0)}</td>
                        <td>Rs. {addedItems.reduce((total, item) => total + item.selling_price, 0)}</td>
                        <td>Rs. {addedItems.reduce((total, item) => total + item.selling_price, 0) - addedItems.reduce((total, item) => total + item.cost_price, 0)}</td>
                    </tr>                    
                </tbody>
            </table>

            <button type="button" className="btn btn-success">Add Sale</button>
        </div>
    </div>
  );
}

export default AddSales;
