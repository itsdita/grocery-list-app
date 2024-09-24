import { useState } from "react";
import { CATEGORIES } from "./recipe-data";

const RecipeList = ({ recipes, selectRecipe }) => {
  const [category, setCategory] = useState("all");

  return (
    <div className="recipe-list">
      <h3>Pick A Category</h3>
      <ul className="recipe-category-container">
        {/* Add an option for "All" recipes */}
        <li key="all" onClick={() => setCategory("all")}>
          All
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </li>
        ))}
      </ul>

      <ul className="recipe-item-container">
        {recipes
          .filter((recipe) => {
            // If "all" is selected, return all recipes
            if (category === "all") return true;

            // Check if the selected category exists in the recipe's category array
            return recipe.category.includes(category);
          })
          .map((recipe) => (
            <li
              key={recipe.id}
              className="recipe-item"
              onClick={() => selectRecipe(recipe)}
            >
              <img
                className="recipe-image"
                src={`http://localhost:5000/uploads/${recipe.image}`}
                alt={recipe.title}
              />
              <span className="recipe-name">{recipe.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeList;
