// models/Recipe.js
const mongoose = require('mongoose');

const IngredientItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
});

const IngredientGroupSchema = new mongoose.Schema({
  groupName: String,
  items: [IngredientItemSchema],
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: [String],
  image: String, // For image URL or data
  instructions: String,
  ingredients: [IngredientGroupSchema],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
