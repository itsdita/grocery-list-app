import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './MainMenu.css'

const MainMenu = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="main-menu">
      <div className="button-grid">
        <div className="menu-button" onClick={() => handleClick("/grocery")}>
          <h2>Grocery Shopping</h2>
        </div>
        <div className="menu-button">
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
  );
};
export default MainMenu;
