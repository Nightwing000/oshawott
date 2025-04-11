import React, { useEffect, useState } from "react";
import "./checkout.css";

const CheckoutPage = ({ cart, setCart }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({ address: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate total cost, delivery fee, GST, etc.
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const platformFee = 10;
  const gst = Math.round((totalCost + deliveryFee + platformFee) * 0.18);
  const totalAmount = totalCost + deliveryFee + platformFee + gst;

  // Fetch addresses from the backend when the component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:3001/addresses", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        console.log("Fetched Addresses:", data);

        if (Array.isArray(data)) {
          setAddresses(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  // Handle adding a new address
  const handleAddAddress = async () => {
    if (newAddress.address) {
      try {
        const response = await fetch("http://localhost:3001/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            address: newAddress.address,
          }),
        });

        const data = await response.json();
        console.log("New Address Added:", data);
        setAddresses([...addresses, data.address]);
        setNewAddress({ address: "" });
      } catch (error) {
        console.error("Error adding address", error);
      }
    }
  };

  // Handle updating an existing address
  const handleUpdateAddress = async () => {
    if (selectedAddress && newAddress.address) {
      try {
        const response = await fetch(`http://localhost:3001/addresses/${selectedAddress._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            address: newAddress.address,
          }),
        });

        const data = await response.json();
        console.log("Updated Address:", data);
        const updatedAddresses = addresses.map(address =>
          address._id === data._id ? data : address
        );
        setAddresses(updatedAddresses);
        setIsUpdating(false);
        setNewAddress({ address: "" });
      } catch (error) {
        console.error("Error updating address", error);
      }
    }
  };

  // Handle selecting an address
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  // Handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    try {
      await fetch(`http://localhost:3001/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddresses(addresses.filter(address => address._id !== addressId));
      if (selectedAddress && selectedAddress._id === addressId) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  // Handle placing an order
  const handleOrderNow = async () => {
    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }

    const orderDetails = {
      userId: localStorage.getItem("userId"),
      address: selectedAddress.address,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalAmount,
      deliveryFee: deliveryFee,
      platformFee: platformFee,
      gst: gst,
      status: "Pending", // Set initial order status
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order placed successfully:", data);
        setCart([]); // Optionally, reset cart after order is placed
        alert("Order placed successfully!");
      } else {
        console.error("Failed to place the order:", data.error);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div className="container">
      {/* Address Section */}
      <div className="delivery-section">
        <h2>📍 Delivery Address:</h2>
        <div className="address-card">
          {addresses && addresses.length === 0 ? (
            <p>No saved addresses. Please add an address.</p>
          ) : (
            addresses.map((address) => {
              if (!address || !address.address) {
                console.warn("Invalid address:", address);
                return null;
              }

              // Determine if this address is selected
              const isSelected = selectedAddress && selectedAddress._id === address._id;

              return (
                <div key={address._id} className={`address ${isSelected ? 'selected' : ''}`}>
                  <p>{address.address || "No address available"}</p>
                  {/* Select Button */}
                  <button onClick={() => handleSelectAddress(address)}>
                    {isSelected ? "Selected" : "Select Address"}
                  </button>
                  {/* Update Button */}
                  <button onClick={() => {
                    setSelectedAddress(address);
                    setNewAddress({ address: address.address });
                    setIsUpdating(true);
                  }}>Update</button>
                  {/* Delete Button */}
                  <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
                  {/* Display a checkmark or indication if this address is selected */}
                  {isSelected && <span className="selected-tag">Selected</span>}
                </div>
              );
            })
          )}
        </div>
        <button className="add-address-btn" onClick={() => setIsUpdating(false)}>+ Add New Address</button>
      </div>

      {/* Update/Add Address */}
      {isUpdating ? (
        <div className="update-address">
          <h3>Update Address</h3>
          <textarea
            placeholder="Full Address"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ address: e.target.value })}
          />
          <button onClick={handleUpdateAddress}>Update Address</button>
        </div>
      ) : (
        <div className="add-address">
          <h3>Add New Address</h3>
          <textarea
            placeholder="Full Address"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ address: e.target.value })}
          />
          <button onClick={handleAddAddress}>Add Address</button>
        </div>
      )}

      {/* Cart Summary Section */}
      <div className="cart-section">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={item.id}>
              <span>{index + 1}.</span>
              <div className="item-details">
                <p>{item.name}</p>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <textarea placeholder="Any instructions for the chef?"></textarea>
        <button className="btn coupon-btn">Apply coupon</button>
        <div className="bill-details">
          <p>Items total: <span>₹{totalCost}</span></p>
          <p>Delivery Fee: <span>₹{deliveryFee}</span></p>
          <p>Platform Fee: <span>₹{platformFee}</span></p>
          <p>GST (18%): <span>₹{gst}</span></p>
          <p className="total-amount">Total Amount: <span>₹{totalAmount}</span></p>
        </div>
      </div>

      {/* Order Button */}
      <button onClick={handleOrderNow} className="order-now-btn">Order Now</button>
    </div>
  );
};

export default CheckoutPage;
