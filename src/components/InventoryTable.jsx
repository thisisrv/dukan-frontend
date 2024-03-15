// InventoryTable.js
import React, {useState} from 'react';


function InventoryTable(props) {

  const [editedItem, setEditedItem] = useState({});
  const [editedItemId, setEditedItemId] = useState(null);

  const handleDelete = (productId) => {
    // Make API call to delete the product with the given productId
    console.log(productId)
    fetch('https://backend.dukanwale.in/deleteProduct/' + productId, {method: "POST"}
    ).then((response) => {
        if (response.ok) {
          // If the deletion is successful, refresh the inventory
          props.onDeleteProduct(productId);
        } else {
          // Handle error
          console.error('Failed to delete product');
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });

  }

  const handleUpdate = (productId) => {
    // Make API call to update the product with the given productId
    console.log('Updated Item:', editedItem);
    // Assuming your API endpoint for updating an item is '/updateProduct/:productId'
    fetch(`https://backend.dukanwale.in/updateProduct/${productId}`, {
      method: 'POST',
      body: JSON.stringify(editedItem),
    })
      .then((response) => {
        if (response.ok) {
          // If the update is successful, refresh the inventory
          // props.onUpdateProduct(productId, editedItem);
          console.log("Edited")
          // Clear editedItem state
          setEditedItem({});
          // Exit editing mode
          setEditedItemId(null);

          //Refresh inventory
          props.onUpdateProduct();
        } else {
          // Handle error
          console.error('Failed to update product');
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleEdit = (field, value) => {
    // Update the editedItem state with the edited field
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,
      [field]: value,
    }));
  };

  return (
    <div className="table-responsive container">
      <h2 className="mb-4">Inventory</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Profit</th>
            <th>Action</th> {/* Add this table header for delete button */}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{editedItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.name || item.name}
                    onChange={(e) => handleEdit('name', e.target.value)}
                  />
                ) : (
                  item.name
                )}
                </td>
              <td>{editedItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.quantity || item.quantity}
                    onChange={(e) => handleEdit('quantity', Number(e.target.value))}
                  />
                ) : (
                  item.quantity
                )}
                </td>
              <td>Rs {editedItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.cost_price || item.cost_price}
                    onChange={(e) => handleEdit('cost_price', Number(e.target.value))}
                  />
                ) : (
                  `${item.cost_price}`
                )}
                </td>
              <td>Rs {editedItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.selling_price || item.selling_price}
                    onChange={(e) => handleEdit('selling_price', Number(e.target.value))}
                  />
                ) : (
                  `${item.selling_price}`
                )}
              </td>
              <td>Rs {item.selling_price - item.cost_price}</td>
              <td>
                {editedItemId === item._id? (
                    <button onClick={() => handleUpdate(item._id)} className="btn btn-success mb-3">
                      Submit
                    </button>
                  ) : (
                    <button onClick={() => setEditedItemId(item._id)} className="btn btn-success mb-3">
                      Edit
                    </button>
                  )}
                {/* Delete button with onClick event to handle deletion */}
                {editedItemId === item._id ? (
                    <button onClick={() => setEditedItemId(null)} className="btn btn-primary mb-3">
                      Back
                    </button>
                  ) : (
                    <button onClick={() => handleDelete(item._id)}  className="btn btn-danger mb-3">
                      Delete
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
