// RecipeForm.jsx
import React, { useState } from "react";
import { sanitizeAndValidateInput } from "../../global-util/sanitizeValidateInput";

const RecipeForm = ({ addRecipe }) => {
  // State variables
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null); // Changed from image URL to image file
  const [ingredientGroups, setIngredientGroups] = useState([
    { groupName: "", items: [{ name: "", quantity: "", unit: "" }] },
  ]);
  const [instructions, setInstructions] = useState("");

  // Handler functions
  const handleNewCategoryChange = (e) =>
    setNewCategory(sanitizeAndValidateInput(e.target.value));
  const handleTitleChange = (e) =>
    setTitle(sanitizeAndValidateInput(e.target.value));

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert("File size should not exceed 5MB.");
        return;
      }

      // Validate file extension
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const fileExtension = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        alert(
          "Please select an image file with a valid extension (.jpg, .jpeg, .png, .gif)."
        );
        return;
      }

      // All validations passed
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const handleInstructionsChange = (e) =>
    setInstructions(sanitizeAndValidateInput(e.target.value));

  // Ingredient group handlers (unchanged)
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
    const sanitizedValue = sanitizeAndValidateInput(value);
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].groupName = sanitizedValue;
    setIngredientGroups(updatedGroups);
  };

  // Ingredient item handlers (unchanged)
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
    const sanitizedValue = sanitizeAndValidateInput(value);
    const updatedGroups = [...ingredientGroups];
    updatedGroups[groupIndex].items[itemIndex][field] = sanitizedValue;
    setIngredientGroups(updatedGroups);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !newCategory || !instructions) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    // Create a new recipe object
    const newRecipe = {
      category: newCategory,
      title,
      imageFile, // Include the image file
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
    setImageFile(null);
    setInstructions("");
    setIngredientGroups([
      { groupName: "", items: [{ name: "", quantity: "", unit: "" }] },
    ]);
    // Reset the file input field
    document.getElementById("image-upload").value = "";
  };

  return (
    <>
      <h3>Add New Recipe</h3>
      <form id="recipe-form" onSubmit={handleSubmit}>
        <div id="recipe-form-main-details">
          {/* Recipe Title */}
          <div className="main-details-input">
            <label htmlFor="recipe-title">Recipe Title:</label>
            <input
              type="text"
              id="recipe-title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          {/* Recipe Category */}
          <div className="main-details-input">
            <label htmlFor="recipe-category">Recipe Category:</label>
            <input
              type="text"
              id="recipe-category"
              value={newCategory}
              onChange={handleNewCategoryChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="main-details-input">
            <label htmlFor="image-upload">Upload Image:</label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
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

export default RecipeForm;
