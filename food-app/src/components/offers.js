import React, { useEffect, useState } from "react";
import "./offers.css";

const Offers = () => {
  const [orders, setOrders] = useState([]); 

  
  const offers = [
    { text: "20% OFF", bgColor: "orange", image: "/images/20perc.jpg" },
    { text: "50% OFF", bgColor: "purple", image: "/images/50perc.jpg" },
    { text: "25% OFF", bgColor: "green", image: "/images/25perc.jpg" },
  ];

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data); 
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); 
  }, []);

  return (
    <section>
      <h2 className="section-title">Offers</h2>
      <div className="offers">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="offer-card"
            style={{ backgroundColor: offer.bgColor }}
          >
            <img src={offer.image} alt={`${offer.text} Offer`} className="offer-image" />
            <p className="offer-text">{offer.text}</p>
          </div>
        ))}
      </div>

      {}
      <h2 className="section-title">Your Previous Orders</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No previous orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">
              <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                <strong>Items:</strong>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Offers;
