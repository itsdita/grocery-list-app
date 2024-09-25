// RecipeApp.jsx
import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import "./RecipeApp.css";

const RecipeApp = () => {
  const [recipesMngmntToggle, setRecipesMngmntToggle] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();

  // Fetch recipes from the backend when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to fetch recipes from the backend
  const fetchRecipes = () => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  // Function to add a new recipe
  const addRecipe = (recipe) => {
    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("category", recipe.category);
    formData.append("title", recipe.title);
    if (recipe.imageFile) {
      formData.append("image", recipe.imageFile);
    }
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", recipe.instructions);

    axios
      .post("http://localhost:5000/api/recipes", formData)
      .then((response) => {
        // Update the recipes state with the new recipe
        setRecipes([...recipes, response.data]);
        setRecipesMngmntToggle(false); // Close the form after adding
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
      });
  };

  // Function to delete a recipe by ID
  const deleteRecipe = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this recipe and all its data?"
      )
    ) {
      axios
        .delete(`http://localhost:5000/api/recipes/${id}`)
        .then(() => {
          // Remove the deleted recipe from the state
          const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
          setRecipes(updatedRecipes);
          if (selectedRecipe && selectedRecipe._id === id) {
            setSelectedRecipe(null);
          }
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    }
  };

  // Function to select or deselect a recipe
  const selectRecipe = (recipe) => {
    if (selectedRecipe && selectedRecipe._id === recipe._id) {
      // If the same recipe is clicked again, deselect it
      setSelectedRecipe(null);
    } else {
      // Otherwise, select the new recipe
      setSelectedRecipe(recipe);
    }
  };

  // Function to export recipes to a JSON file
  const exportRecipes = () => {
    // Fetch recipes from the backend (ensure data is up-to-date)
    axios
      .get("http://localhost:5000/api/recipes")
      .then((response) => {
        const dataStr = JSON.stringify(response.data, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "recipes.json";
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error exporting recipes:", error);
      });
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
            // Send imported recipes to the backend
            axios
              .post("http://localhost:5000/api/recipes/import", {
                recipes: importedRecipes,
              })
              .then(() => {
                alert("Recipes imported successfully!");
                fetchRecipes(); // Refresh the recipe list
                setSelectedRecipe(null);
              })
              .catch((error) => {
                alert("Error importing recipes.");
                console.error("Error importing recipes:", error);
              });
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
