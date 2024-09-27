import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroceryApp from './components/GroceryApp/GroceryApp';
import RecipeApp from './components/CookingApp/RecipeApp';
import MainMenu from './components/MainMenu'; // Adjust the path if necessary
import './App.css';
import './Buttons.css';

const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/grocery/*" element={<GroceryApp />} />
        <Route path="/cooking/*" element={<RecipeApp />} />
      </Routes>
    </Router>
  );
};

export default App;
