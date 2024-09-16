import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GroceryApp from './components/GroceryApp/GroceryApp'; // Adjust the path if necessary
import MainMenu from './components/MainMenu'; // Adjust the path if necessary
import './App.css';
import './Buttons.css';

const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/grocery/*" element={<GroceryApp />} />
      </Routes>
    </Router>
  );
};

export default App;
