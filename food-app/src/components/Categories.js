import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "./categories.css";

const Categories = ({ onFilter }) => {
  const categories = ["South Indian", "Biryani", "Pizza", "Chinese", "Cakes", "Ice Cream", "Waffles", "Chaats", "Beverages", "Rolls"];
  const categoriesRef = useRef(null);
  const navigate = useNavigate(); 

  const scrollLeft = () => {
    categoriesRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    categoriesRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    const categoryRoutes = {
      "Pizza": "/pizza",
      "Biryani": "/biryani",
     
    };

    if (categoryRoutes[category]) {
      navigate(categoryRoutes[category]);
    }
  };

  return (
    <section className="categories-section">
      <button className="arrow-btn left-arrow" onClick={scrollLeft}>
        &#8592;
      </button>
      <div className="categories" ref={categoriesRef}>
        {categories.map((category, index) => (
          <div key={index} className="category-card" onClick={() => handleCategoryClick(category)}>
            <div className="image-container">
              <img
                src={`/images/${category.toLowerCase()}.jpg`}
                alt={category}
              />
            </div>
            <p>{category}</p>
          </div>
        ))}
      </div>
      <button className="arrow-btn right-arrow" onClick={scrollRight}>
        &#8594;
      </button>
    </section>
  );
};

export default Categories;