const RECIPE_DATA = [
  {
    id: 1,
    title: "ハンバーグ",
    category: ["beef"], // Categories for the entire recipe
    ingredientCategories: [
      {
        categoryName: "For Patty", // Ingredient section/category name
        ingredients: [
          {
            name: "onion",
            quantity: { number: 200, unit: "g" },
          },
          {
            name: "garlic",
            quantity: { number: 4, unit: "g" },
          },
          { name: "ground beef", quantity: { number: 700, unit: "g" } },
          { name: "soft tofu", quantity: { number: 140, unit: "g" } },
          {
            name: "panko",
            quantity: { number: 50, unit: "g" },
          },
          { name: "egg", quantity: { number: 1, unit: "large" } },
          { name: "oyster sauce", quantity: { number: 2, unit: "tbsp" } },
          { name: "ground nutmeg", quantity: { number: 0.25, unit: "tsp" } },
          {
            name: "ground black pepper",
            quantity: { number: 0.25, unit: "tsp" },
          },
          { name: "vegetable oil", quantity: { number: 2, unit: "tsp" } },
        ],
      },
      {
        categoryName: "For Sauce", // Another section/category name
        ingredients: [
          { name: "dry red wine", quantity: { number: 0.5, unit: "cup" } },
          { name: "ketchup", quantity: { number: 0.33, unit: "cup" } },
          {
            name: "chunou sauce",
            quantity: { number: 3, unit: "tbsp" },
          },
          { name: "oyster sauce", quantity: { number: 1, unit: "tbsp" } },
        ],
      },
    ],
    instructions: "Instructions for making the patty and sauce go here.",
  },
];

const CATEGORIES = [
  "beef",
  "pork",
  "chicken",
  "fish",
  "sides",
  "hotpot",
  "pasta",
  "t's favorites",
];

export { RECIPE_DATA, CATEGORIES };
