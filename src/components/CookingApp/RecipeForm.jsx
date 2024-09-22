import React, { useState } from "react";
import { sanitizeAndValidateInput } from "../../global-util/sanitizeValidateInput";

const RecipeForm = ({ addRecipe }) => {
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !instructions) {
      alert("Please fill in all fields");
      return;
    }

    const categorySanitized = sanitizeAndValidateInput(newCategory);
    const titleSanitized = sanitizeAndValidateInput(title);
    const ingredientsSanitized = sanitizeAndValidateInput(ingredients);
    const instructionsSanitized = sanitizeAndValidateInput(instructions);

    if (!categorySanitized || !titleSanitized || !ingredientsSanitized || !instructionsSanitized) {
      alert("Please enter valid input");
      return;
    }

    // Parse ingredients: expect format like "pasta 200g, eggs 4, bacon 100g"
    const parsedIngredients = ingredientsSanitized
      .split(",") // Split by commas to get each ingredient
      .map((ing) => {
        const parts = ing.trim().split(" "); // Split ingredient into parts
        const quantityNumber = parseFloat(parts[1]); // Extract quantity number
        const quantityUnit = parts[1].replace(/[0-9.]/g, "") || ""; // Extract quantity unit (removing numbers)
        const ingredientName = parts[0]; // Extract ingredient name (first part)

        return {
          category: categorySanitized,
          name: ingredientName,
          quantity: {
            number: quantityNumber || 1, // Default to 1 if number is missing
            unit: quantityUnit,
          },
        };
      });

    const newRecipe = {
      id: Date.now(),
      category: categorySanitized,
      title: titleSanitized,
      ingredients: parsedIngredients, // Use parsed ingredients
      instructions: instructionsSanitized,
    };

    addRecipe(newRecipe);
    setNewCategory("");
    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="recipe-form">
      <h3>Add a New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={newCategory}
            id="category"
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Recipe Title:</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients (e.g., "pasta 200g, eggs 4"):</label>
          <input
            type="text"
            value={ingredients}
            id="ingredients"
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            value={instructions}
            id="instructions"
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
