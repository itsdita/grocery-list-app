import React from 'react';

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions || 'No instructions provided.'}</p>
    </div>
  );
};

export default RecipeDetail;
