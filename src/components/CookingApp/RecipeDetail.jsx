import React from "react";

const RecipeDetail = ({ recipe }) => {
  // Ensure recipe is defined
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Provide a default value for ingredientCategories
  const ingredientCategories = recipe.ingredientCategories || [];

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>

      {ingredientCategories.map((ingredientCategory, idx) => (
        <div key={idx}>
          <h3>{ingredientCategory.categoryName}:</h3>
          <ul>
            {ingredientCategory.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}: {ingredient.quantity.number} {ingredient.quantity.unit}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
