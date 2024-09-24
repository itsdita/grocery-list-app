import React from "react";

const RecipeDetail = ({ recipe }) => {
  // Ensure recipe is defined
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Provide a default value for ingredients
  const ingredients = recipe.ingredients || [];

  // Debugging statements
  console.log('Recipe:', recipe);
  console.log('Ingredients:', ingredients);

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>

      {/* Display the image if available */}
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      )}

      {/* Loop through ingredient groups */}
      {ingredients.map((ingredientGroup, idx) => (
        <div key={idx} className="ingredient-group">
          <h3>{ingredientGroup.groupName}:</h3>
          <ul>
            {(ingredientGroup.items || []).map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}: {ingredient.quantity} {ingredient.unit}
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
