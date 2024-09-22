import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";


import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { RECIPE_DATA } from "./recipe-data";

import "./RecipeApp.css";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState(() => {
    // Load recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // If there are no recipes in localStorage, use RECIPE_DATA
    if (storedRecipes.length === 0) {
      // Save RECIPE_DATA to localStorage
      localStorage.setItem("recipes", JSON.stringify(RECIPE_DATA));
      return RECIPE_DATA;
    } else {
      // Return stored recipes
      return storedRecipes;
    }
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    if (selectedRecipe && selectedRecipe.id === id) {
      setSelectedRecipe(null);
    }
  };

  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div id="recipe-app-container">
        <div className="recipe-app">
          <h2>My Recipes</h2>
          <RecipeList
            recipes={recipes}
            selectRecipe={selectRecipe}
          />
          {selectedRecipe && (
            <RecipeDetail recipe={selectedRecipe} deleteRecipe={deleteRecipe} />
          )}
          <RecipeForm addRecipe={addRecipe} />
        </div>
      </div>
      <section id="back-to-main-menu">
        <button onClick={() => handleClick("/")}>BACK TO MAIN MENU</button>
      </section>
    </>
  );
};

export default RecipeApp;
