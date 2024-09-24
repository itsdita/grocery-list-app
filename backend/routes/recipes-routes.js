// routes/recipes.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const multer = require("multer");
const path = require("path");

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single recipe by ID
router.get("/:id", getRecipe, (req, res) => {
  res.json(res.recipe);
});

// CREATE a new recipe with image upload
router.post("/", upload.single("image"), async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    category: req.body.category.split(","), // Assuming categories are sent as a comma-separated string
    image: req.file ? req.file.filename : null, // Store the filename
    instructions: req.body.instructions,
    ingredients: JSON.parse(req.body.ingredients),
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a recipe
router.put("/:id", getRecipe, async (req, res) => {
  res.recipe.title = req.body.title || res.recipe.title;
  res.recipe.category = req.body.category || res.recipe.category;
  res.recipe.image = req.body.image || res.recipe.image;
  res.recipe.instructions = req.body.instructions || res.recipe.instructions;
  res.recipe.ingredients = req.body.ingredients || res.recipe.ingredients;

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a recipe
router.delete("/:id", getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// IMPORT recipes from JSON
router.post("/import", async (req, res) => {
    const { recipes } = req.body;
  
    if (!Array.isArray(recipes)) {
      return res.status(400).json({ message: "Invalid data format" });
    }
  
    try {
      // Insert multiple recipes
      await Recipe.insertMany(recipes);
      res.status(201).json({ message: "Recipes imported successfully" });
    } catch (err) {
      console.error("Error importing recipes:", err);
      res.status(500).json({ message: "Error importing recipes" });
    }
  });

// Middleware function to get a recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Cannot find recipe" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.recipe = recipe;
  next();
}

module.exports = router;
