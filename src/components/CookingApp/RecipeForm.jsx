import React, { useState } from "react";
import { sanitizeAndValidateInput } from "../../global-util/sanitizeValidateInput";

const RecipeForm = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients) {
      alert("Please fill in all fields");
      return;
    }
    const titleSanitized = sanitizeAndValidateInput(title);
    const ingredientsSanitized = sanitizeAndValidateInput(ingredients);
    const instructionsSanitized = sanitizeAndValidateInput(instructions);

    const newRecipe = {
      id: Date.now(),
      title: titleSanitized,
      ingredients: ingredientsSanitized
        .toLowerCase()
        .split(",")
        .map((ing) => ing.trim()),
      instructions: instructionsSanitized,
    };

    addRecipe(newRecipe);
    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="recipe-form">
      <h3>Add a New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
