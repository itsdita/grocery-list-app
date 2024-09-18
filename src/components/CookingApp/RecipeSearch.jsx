import React, { useState } from 'react';

const RecipeSearch = ({ searchRecipes }) => {
  const [searchIngredients, setSearchIngredients] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchIngredients) return;

    const ingredientsArray = searchIngredients
      .toLowerCase()
      .split(',')
      .map((ing) => ing.trim());

    searchRecipes(ingredientsArray);
    setSearchIngredients('');
  };

  return (
    <div className="recipe-search">
      <h3>Find Recipes by Ingredients</h3>
      <form onSubmit={handleSearch}>
        <div>
          <label>Ingredients you have (comma-separated):</label>
          <input
            type="text"
            value={searchIngredients}
            onChange={(e) => setSearchIngredients(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search Recipes</button>
      </form>
    </div>
  );
};

export default RecipeSearch;
