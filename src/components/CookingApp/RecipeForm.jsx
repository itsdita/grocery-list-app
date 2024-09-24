import React, { useState } from "react";

const RecipeForm = ({ addRecipe }) => {
  // State variables
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientGroups, setIngredientGroups] = useState([
    { groupName: "", items: [{ name: "", quantity: "", unit: "" }] },
  ]);

  // Handler functions
  const handleNewCategoryChange = (e) => setNewCategory(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleInstructionsChange = (e) => setInstructions(e.target.value);

  // Ingredient group handlers
  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { groupName: "", items: [{ name: "", quantity: "", unit: "" }] },
    ]);
  };

  const removeIngredientGroup = (groupIndex) => {
    const updatedGroups = ingredientGroups.filter(
      (_, index) => index !== groupIndex
    );
    setIngredientGroups(updatedGroups);
  };

  const handleGroupNameChange = (groupIndex, value) => {
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].groupName = value;
    setIngredientGroups(updatedGroups);
  };

  // Ingredient item handlers
  const addIngredientItem = (groupIndex) => {
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].items.push({ name: "", quantity: "", unit: "" });
    setIngredientGroups(updatedGroups);
  };

  const removeIngredientItem = (groupIndex, itemIndex) => {
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].items = updatedGroups[groupIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    setIngredientGroups(updatedGroups);
  };

  const handleIngredientItemChange = (groupIndex, itemIndex, field, value) => {
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].items[itemIndex][field] = value;
    setIngredientGroups(updatedGroups);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new recipe object
    const newRecipe = {
      id: Date.now(), // Unique ID
      category: newCategory,
      title,
      image,
      instructions,
      ingredients: ingredientGroups.map((group) => ({
        groupName: group.groupName,
        items: group.items.map((item) => ({
          name: item.name,
          quantity: parseFloat(item.quantity) || 0,
          unit: item.unit,
        })),
      })),
    };

    // Call addRecipe function from props
    addRecipe(newRecipe);

    // Reset form fields
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setNewCategory("");
    setTitle("");
    setImage("");
    setInstructions("");
    setIngredientGroups([
      { groupName: "", items: [{ name: "", quantity: "", unit: "" }] },
    ]);
  };

  return (
    <>
      <h3>Add New Recipe</h3>
      <form id="recipe-form" onSubmit={handleSubmit}>
        {/* Recipe Title */}
        <div>
          <label>Recipe Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label>Recipe Category:</label>
          <input
            type="text"
            value={newCategory}
            onChange={handleNewCategoryChange}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Instructions */}
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={handleInstructionsChange}
            required
          />
        </div>

        {/* Ingredients */}
        <div id="recipe-form-ingredients">
          <label>Ingredients:</label>
          {ingredientGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="ingredient-group">
              <div className="group-container">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={group.groupName}
                  className="group-name"
                  onChange={(e) =>
                    handleGroupNameChange(groupIndex, e.target.value)
                  }
                />
                <button
                  className="remove-group-btn"
                  type="button"
                  onClick={() => removeIngredientGroup(groupIndex)}
                >
                  Remove Group
                </button>
              </div>
              <div id="ingredient-item-container">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="ingredient-item">
                    <input
                      type="text"
                      placeholder="Ingredient Name"
                      value={item.name}
                      onChange={(e) =>
                        handleIngredientItemChange(
                          groupIndex,
                          itemIndex,
                          "name",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleIngredientItemChange(
                          groupIndex,
                          itemIndex,
                          "quantity",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      className="unit"
                      value={item.unit}
                      onChange={(e) =>
                        handleIngredientItemChange(
                          groupIndex,
                          itemIndex,
                          "unit",
                          e.target.value
                        )
                      }
                      required
                    />
                    <button
                      className="remove-ingredient-btn"
                      type="button"
                      onClick={() =>
                        removeIngredientItem(groupIndex, itemIndex)
                      }
                    >
                      Remove Ingredient
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="add-ingredient-btn"
                type="button"
                onClick={() => addIngredientItem(groupIndex)}
              >
                Add Ingredient
              </button>
            </div>
          ))}
          <button
            className="add-ingredient-group-btn"
            type="button"
            onClick={addIngredientGroup}
          >
            Add Ingredient Group
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </>
  );
};

// Utility function
function createRecipeObject(title, image, ingredients, instructions) {
  return {
    title,
    image,
    ingredients,
    instructions,
  };
}

export default RecipeForm;
