
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Restaurants from "./components/Restaurants";
import Offers from "./components/offers";
import PizzaPage from "./components/pizzapage";
import Cart from "./components/cart";
import Resto from "./components/restopage";
import CheckoutPage from "./components/CheckoutPage";
import Biryani from "./components/biryanipage";
import Biryanilist from "./components/biryanlist";
import Login from "./components/login"; 
import Register from "./components/register";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleSearch = (event) => {
    console.log(event.target.value);
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<><Categories /><Restaurants /><Offers /></>} />
          <Route path="/pizza" element={<PizzaPage />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
          <Route path="/biryani" element={<Biryani />} />
          <Route path="/resto/:pizzaId" element={<Resto cart={cart} setCart={setCart} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/biryanilist/:biryaniId" element={<Biryanilist cart={cart} setCart={setCart} />} />
          
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
