// MainMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "./WeatherWidget/WeatherWidget"; // Import the WeatherWidget
import "./MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="main-menu">
        <div className="button-grid">
        {/* Add the WeatherWidget at the top */}
        <WeatherWidget />
          <div className="menu-button" onClick={() => handleClick("/grocery")}>
            <h2>Shopping</h2>
          </div>
          <div className="menu-button" onClick={() => handleClick("/cooking")}>
            <h2>Cooking</h2>
          </div>
          <div className="menu-button">
            <h2>Schedule</h2>
          </div>
          <div className="menu-button">
            <h2>Tasks</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
