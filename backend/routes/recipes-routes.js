// routes/recipes.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

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
    category: req.body.category.split(","), // Assuming categories are sent as a comma-separated string
    title: req.body.title,
    image: req.file ? req.file.filename : null, // Store the filename
    ingredients: JSON.parse(req.body.ingredients),
    instructions: req.body.instructions,
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
  res.recipe.category = req.body.category || res.recipe.category;
  res.recipe.title = req.body.title || res.recipe.title;
  res.recipe.image = req.body.image || res.recipe.image;
  res.recipe.ingredients = req.body.ingredients || res.recipe.ingredients;
  res.recipe.instructions = req.body.instructions || res.recipe.instructions;

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipe.deleteOne({ _id: id });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ message: "Server error while deleting recipe" });
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
