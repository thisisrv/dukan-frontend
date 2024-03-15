import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesTable from './salesTable';
import TotalTable from './totalTable';

function AddSales() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    axios.get('https://backend.dukanwale.in/products')
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

  function handleAddProduct() {
    const product = products.find(p => p.name === selectedProduct);
    console.log(product);
    if (product) {
      // Check if the product already exists in addedItems
      const existingItem = addedItems.find(item => item.key === product._id);
      if (existingItem) {
        // If the product exists, update its quantity
        const updatedItems = addedItems.map(item => {
          if (item.key === product._id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
              cost_price: (item.quantity + quantity) * product.cost_price,
              selling_price: (item.quantity + quantity) * product.selling_price
            };
          }
          return item;
        });
        setAddedItems(updatedItems);
      } else {
        // If the product does not exist, add it to addedItems
        const newItem = {
          key: product._id,
          name: product.name,
          quantity: quantity,
          cost_price: quantity * product.cost_price,
          selling_price: quantity * product.selling_price
        };
        setAddedItems([...addedItems, newItem]);
      }
      setSelectedProduct('');
      setQuantity(1);
    }
  }
  

  const handleEditSellingPrice = (itemId, newSellingPrice) => {
    const updatedItems = addedItems.map(item => {
      if (item.key === itemId) {
        return {
          ...item,
          selling_price: newSellingPrice
        };
      }
      return item;
    });
    setAddedItems(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = addedItems.filter(item => item.key !== itemId);
    setAddedItems(updatedItems);
    console.log(addedItems)

  };

  return (
    <div className="container mt-4">
      <h1>Record Sales ({`${day}-${month}-${year}`})</h1>
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
        {/* <button type="button" onClick={handleAddProduct} className="btn btn-primary">Add Product</button> */}
        {quantity > 0 && <button type="button" onClick={handleAddProduct} className="btn btn-primary">Add Product</button>}
      </form>
      
      {addedItems.length > 0 && <SalesTable addedItems={addedItems} handleEditSellingPrice={handleEditSellingPrice} handleRemoveItem={handleRemoveItem}/>}
      {addedItems.length > 0 && <TotalTable addedItems={addedItems} />}
    </div>
  );
}

export default AddSales;

