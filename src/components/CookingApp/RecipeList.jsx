import React from "react";

const RecipeList = ({ recipes, selectRecipe, deleteRecipe }) => {
  return (
    <div className="recipe-list">
      <h3>My Recipes</h3>
      <h4>{recipes.length > 0 ? "Recipes" : "No Recipes Found"}</h4>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <span onClick={() => selectRecipe(recipe)}>{recipe.title}</span>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
