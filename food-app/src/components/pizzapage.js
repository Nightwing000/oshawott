import React, { useState } from "react";
import { Link } from "react-router-dom";

const PizzaPage = () => {
  const [filter, setFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [deliveryFilter, setDeliveryFilter] = useState("All");

  const pizzaData = [
    { id: 1, name: "Margherita", restaurant: "Pizza Palace", rating: 4.9, deliveryTime: 30, veg: true, image: "./images/margh.jpg" },
    { id: 2, name: "Farmhouse", restaurant: "Green Eats", rating: 4.8, deliveryTime: 25, veg: true, image: "./images/farmhouse.jpg" },
    { id: 3, name: "Pepperoni Feast", restaurant: "Carnivore's Delight", rating: 4.8, deliveryTime: 40, veg: false, image: "./images/pepperoni.jpg" },
    { id: 4, name: "Cheese Burst", restaurant: "Cheesy Bites", rating: 4.7, deliveryTime: 20, veg: true, image: "./images/cheeseburst.jpg" },
    { id: 5, name: "Chicken Supreme", restaurant: "Meat Lover's", rating: 4.6, deliveryTime: 35, veg: false, image: "./images/chicksup.jpg" },
    { id: 6, name: "Veggie Overload", restaurant: "Green Delight", rating: 4.5, deliveryTime: 15, veg: true, image: "./images/veggie.jpg" },
  ];

  const filteredData = pizzaData.filter((pizza) => {
    const isVeg = filter === "Veg" ? pizza.veg : filter === "Non-Veg" ? !pizza.veg : true;
    const isRated = ratingFilter === "All" || pizza.rating >= parseFloat(ratingFilter);
    const isDeliveredOnTime = deliveryFilter === "All" || pizza.deliveryTime <= parseInt(deliveryFilter, 10);

    return isVeg && isRated && isDeliveredOnTime;
  });

  const getButtonClass = (option) => {
    if (filter === option) {
      const color = option === "Veg" ? "green" : option === "Non-Veg" ? "red" : "gray";
      return `bg-${color}-100 border-${color}-500`;
    } else {
      return "border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-300 flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center">
          <img
            src="./images/oshawott.png"
            alt="Logo"
            className="w-12 h-12 mr-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">OSHAWOTT</h1>
        </Link>
        
        
      </header>

      {/* Filters */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        {["All", "Veg", "Non-Veg"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getButtonClass(option)}`}
          >
            <span className={`w-3 h-3 ${option === "Veg" ? "bg-green-500" : option === "Non-Veg" ? "bg-red-500" : "bg-gray-500"} rounded-full`}></span>
            <span>{option}</span>
          </button>
        ))}
        <select
          onChange={(e) => setRatingFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="All">All Ratings</option>
          <option value="4.5">4.5+</option>
          <option value="4.6">4.6+</option>
          <option value="4.7">4.7+</option>
          <option value="4.8">4.8+</option>
        </select>
        <select
          onChange={(e) => setDeliveryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="All">All Delivery Times</option>
          <option value="20">Up to 20 mins</option>
          <option value="30">Up to 30 mins</option>
          <option value="40">Up to 40 mins</option>
        </select>
      </div>

      {/* Pizza Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-6">
        {filteredData.map((pizza) => (
          <Link to={`/resto/${pizza.id}`} key={pizza.id} className="no-underline">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{pizza.restaurant}</h3>
              <p className="text-sm text-gray-500">{pizza.name}</p>
              <span className="inline-block mt-2 px-3 py-1 text-white bg-green-500 rounded-full">
                {pizza.rating}
              </span>
              <p className="mt-2 text-sm text-gray-600">
                Delivery Time: {pizza.deliveryTime} mins
              </p>
            </div>
          </div>
        </Link>
        
        ))}
      </div>
    </div>
  );
};

export default PizzaPage;
