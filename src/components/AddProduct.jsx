// AddProduct.js
import React, { useState } from 'react';

function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name: productName,
      quantity: quantity,
      cost_price: costPrice,
      selling_price: sellingPrice
    };

    try {
      const response = await fetch('http://localhost:8000/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        onAddProduct(); // Notify parent component that a product has been added
        setProductName('');
        setQuantity('');
        setCostPrice('');
        setSellingPrice('');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Add Product to Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="costPrice">Cost Price</label>
          <input type="number" className="form-control" id="costPrice" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="sellingPrice">Selling Price</label>
          <input type="number" className="form-control" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default AddProduct;