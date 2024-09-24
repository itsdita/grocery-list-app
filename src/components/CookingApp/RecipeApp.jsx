import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import { useNavigate } from "react-router-dom";
import { RECIPE_DATA } from "./recipe-data";
import "./RecipeApp.css";

const RecipeApp = () => {
  const [recipesMngmntToggle, setRecipesMngmntToggle] = useState(false);

  const [recipes, setRecipes] = useState(() => {
    // Load recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // If there are no recipes in localStorage, use RECIPE_DATA
    if (storedRecipes.length === 0) {
      // Save RECIPE_DATA to localStorage
      localStorage.setItem("recipes", JSON.stringify(RECIPE_DATA));
      return RECIPE_DATA;
    } else {
      // Return stored recipes
      return storedRecipes;
    }
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Function to add a new recipe
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  // Function to delete a recipe by ID
  const deleteRecipe = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category and all its items?"
      )
    ) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);
      if (selectedRecipe && selectedRecipe.id === id) {
        setSelectedRecipe(null);
      }
    }
  };

  // Function to select or deselect a recipe
  const selectRecipe = (recipe) => {
    if (selectedRecipe && selectedRecipe.id === recipe.id) {
      // If the same recipe is clicked again, deselect it
      setSelectedRecipe(null);
    } else {
      // Otherwise, select the new recipe
      setSelectedRecipe(recipe);
    }
  };

  // Function to export recipes to a JSON file
  const exportRecipes = () => {
    const dataStr = JSON.stringify(recipes, null, 2); // Pretty-print with indentation
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "recipes.json";
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  // Function to import recipes from a JSON file
  const importRecipes = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Ensure it's a JSON file
      if (file.type !== "application/json") {
        alert("Please upload a valid JSON file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedRecipes = JSON.parse(e.target.result);

          // Validate the structure of importedRecipes
          if (Array.isArray(importedRecipes)) {
            setRecipes(importedRecipes);
            setSelectedRecipe(null);
            alert("Recipes imported successfully!");
          } else {
            alert("Invalid recipe data format.");
          }
        } catch (error) {
          alert("Error parsing JSON file.");
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div id="recipe-app-container">
        <div className="recipe-app">
          <h2>My Recipes</h2>

          <RecipeList recipes={recipes} selectRecipe={selectRecipe} />
          {selectedRecipe && (
            <RecipeDetail recipe={selectedRecipe} deleteRecipe={deleteRecipe} />
          )}
          <div>
            <h3
              onClick={() => setRecipesMngmntToggle(!recipesMngmntToggle)}
              style={{ cursor: "pointer" }}
            >
              Recipes Management
            </h3>
            {recipesMngmntToggle && (
              <>
                {/* Buttons to export and import recipes */}
                <div className="recipe-app-buttons">
                  <button onClick={exportRecipes}>Export Recipes</button>
                  <label htmlFor="import-recipes" className="import-file">
                    Import Recipes
                  </label>
                  <input
                    type="file"
                    id="import-recipes"
                    accept=".json"
                    onChange={importRecipes}
                    style={{ display: "none" }}
                  />
                </div>
                <RecipeForm addRecipe={addRecipe} />
              </>
            )}
          </div>
        </div>
      </div>
      <section id="back-to-main-menu">
        <button onClick={() => handleClick("/")}>BACK TO MAIN MENU</button>
      </section>
    </>
  );
};

export default RecipeApp;
