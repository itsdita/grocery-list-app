// models/Recipe.js
const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  instructions: String,
  ingredients: [
    {
      groupName: String,
      items: [
        {
          name: String,
          quantity: Number,
          unit: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Recipe", RecipeSchema, "recipesList");
