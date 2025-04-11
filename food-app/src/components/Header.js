import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page
    navigate("/login");
  };

  const handleLogout = () => {
    // Clear any session tokens or login details if necessary
    localStorage.removeItem("token");
    alert("Logged out successfully!");
  };

  const isLoggedIn = !!localStorage.getItem("token"); // Check login status

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img
            src="/images/oshawott.png"
            alt="OSHAWOTT Logo"
            className="logo"
          />
        </Link>
      </div>

      <select className="location-text">
        <option value="none" selected disabled hidden>
          Select your Location
        </option>
        <option>Bengaluru</option>
        <option>Delhi</option>
      </select>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <button className="auth-btn" onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button className="auth-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <div className="cart-container">
        <Link to="/cart" className="cart-link">
          <img src="/images/cart.png" alt="Cart" className="cart-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
