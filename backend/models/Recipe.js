const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  category: Array,
  title: String,
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
