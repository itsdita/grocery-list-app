import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import RecipeSearch from "./RecipeSearch";

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
  const [searchResults, setSearchResults] = useState([]);

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

  const searchRecipes = (ingredients) => {
    const results = recipes.filter((recipe) =>
      ingredients.every((ingredient) =>
        recipe.ingredients.includes(ingredient.toLowerCase())
      )
    );
    setSearchResults(results);
  };

  return (
    <div id="recipe-app-container">
      <div className="recipe-app">
        <h2>My Recipe Organizer</h2>
        <RecipeList
          recipes={searchResults.length > 0 ? searchResults : recipes}
          selectRecipe={selectRecipe}
          deleteRecipe={deleteRecipe}
        />
        {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
        <RecipeSearch searchRecipes={searchRecipes} />
        <RecipeForm addRecipe={addRecipe} />
      </div>
    </div>
  );
};

export default RecipeApp;
