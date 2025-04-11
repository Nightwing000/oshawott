import React from "react";
import { useParams, Link } from "react-router-dom";

const Biryanilist = ({ cart, setCart }) => {
  const { biryaniId } = useParams(); 
  const biryaniData = [
    { id: 1, name: "Hyderabadi Biryani", restaurant: "Spice Hub", price: 250,imageUrl: "/images/hyd.jpg" },
    { id: 2, name: "Veg Biryani", restaurant: "Green Bites", price: 220,imageUrl: "/images/veg.jpg" },
    { id: 3, name: "Chicken Biryani", restaurant: "Meat Feast", price: 280,imageUrl: "/images/chick.jpg" },
    { id: 4, name: "Paneer Biryani", restaurant: "Veggie Delight", price: 240,imageUrl: "/images/pan.jpg" },
    { id: 5, name: "Mutton Biryani", restaurant: "Royal Treat", price: 300,imageUrl: "/images/mut.jpg" },
    { id: 6, name: "Egg Biryani", restaurant: "Egg World", price: 230 ,imageUrl: "/images/egg.jpg"},
  ];

  const biryani = biryaniData.find((b) => b.id === parseInt(biryaniId));

  if (!biryani) return <p>Biryani not found</p>; 


  const addToCart = (biryani) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === biryani.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === biryani.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...biryani, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="bg-white shadow rounded-lg p-4 flex">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{biryani.name}</h1>
          <p className="text-lg text-gray-700">₹{biryani.price}</p>
          <button
            onClick={() => addToCart(biryani)}
            className="mt-4 bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
        <div><img
            src={biryani.imageUrl}
            alt={biryani.name}
            className="w-48 h-48 object-cover rounded-lg"
          /></div>
      </div>

      <Link to="/cart" className="block mt-6 text-center text-blue-500">
        Go to Cart
      </Link>
    </div>
  );
};

export default Biryanilist;
