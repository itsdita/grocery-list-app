import React from "react";

const RecipeList = ({ recipes, selectRecipe, deleteRecipe }) => {
  return (
    <div className="recipe-list">
      <h3>My Recipes</h3>
      <h4>{recipes.length > 0 ? null : "No Recipes Found"}</h4>
      <ul className="recipe-item-container">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-item" onClick={() => selectRecipe(recipe)}>
            <img
              className="recipe-image"
              src="src\assets\placeholder.webp"
              alt={recipe.title}
            />
            <span className="recipe-name">
              {recipe.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
