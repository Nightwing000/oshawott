import React from "react";
import './restaurants.css'
const Restaurants = () => {
  const restaurants = ["Pizza Hut", "Burger King", "Paradise", "KFC", "Truffles"];

  return (
    <section>
      <h2 className="section-title">Top Restaurants</h2>
      <div className="restaurants">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img
              src={`/images/${restaurant.toLowerCase().replace(" ", "_")}.png`}
              alt={restaurant}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
