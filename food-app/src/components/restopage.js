import React from "react";
import { useParams, Link } from "react-router-dom";

const Resto = ({ cart, setCart }) => {
  const { pizzaId } = useParams(); 
  const pizzaData = [
    { id: 1, name: "Margherita", restaurant: "Pizza Palace", price: 350, imageUrl: "/images/margh.jpg" },
    { id: 2, name: "Farmhouse", restaurant: "Green Eats", price: 350, imageUrl: "/images/farmhouse.jpg" },
    { id: 3, name: "Pepperoni Feast", restaurant: "Carnivore's Delight", price: 400, imageUrl: "/images/pepperoni.jpg" },
    { id: 4, name: "Cheese Burst", restaurant: "Cheesy Bites", price: 375, imageUrl: "/images/cheeseburst.jpg" },
    { id: 5, name: "Chicken Supreme", restaurant: "Meat Lover's", price: 400, imageUrl: "/images/chicksup.jpg" },
    { id: 6, name: "Veggie Overload", restaurant: "Green Delight", price: 325, imageUrl: "/images/veggie.jpg" },
  ];

  const pizza = pizzaData.find((p) => p.id === parseInt(pizzaId));

  if (!pizza) return <p>Pizza not found</p>;

  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pizza.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="bg-white shadow rounded-lg p-4 flex">
        <div className="flex-1 pr-6">
          <h1 className="text-2xl font-bold">{pizza.name}</h1>
          <p className="text-lg text-gray-700">₹{pizza.price}</p>
          <button
            onClick={() => addToCart(pizza)}
            className="mt-4 bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex-none">
          <img
            src={pizza.imageUrl}
            alt={pizza.name}
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      <Link to="/cart" className="block mt-6 text-center text-blue-500">
        Go to Cart
      </Link>
    </div>
  );
};

export default Resto;
