import React from "react";

const RecipeDetail = ({ recipe, deleteRecipe }) => {
  // Ensure recipe is defined
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Provide a default value for ingredients
  const ingredients = recipe.ingredients || [];

  // Debugging statements
  console.log("Recipe:", recipe);
  console.log("Ingredients:", ingredients);

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>

      {/* Display the image if available */}
      <div className="recipe-detail-image">{recipe.image && <img src={`http://localhost:5000/uploads/${recipe.image}`} alt={recipe.title} />}</div>
      <div className="recipe-detail-ingredients">
        {/* Loop through ingredient groups */}
        {ingredients.map((ingredientGroup, idx) => (
          <div key={idx} className="ingredient-group">
            <h4>{ingredientGroup.groupName}:</h4>
            <ul>
              {(ingredientGroup.items || []).map((ingredient, index) => (
                <li key={index}>
                  <div>- {ingredient.name}:</div><div className="quantity-unit"><span>{ingredient.quantity}</span><span>{ingredient.unit}</span></div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p>{recipe.instructions}</p>
      <button id="recipe-detail-delete" onClick={()=>deleteRecipe(recipe.id)}>Delete Recipe</button>
    </div>
  );
};

export default RecipeDetail;
