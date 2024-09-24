import hanbaagu from "../../assets/recipe-images/japanese-hamburg-steak-002.jpeg";


const RECIPE_DATA = [
  {
    id: 1,
    category: ["beef", "main", "dinner"], // Categories for the entire recipe
    title: "ハンバーグ",
    image: hanbaagu,
    ingredients: [
      {
        groupName: "For Patty", // Ingredient section/category name
        items: [
          { name: "onion", quantity: 200, unit: "g" },
          { name: "garlic", quantity: 4, unit: "g" },
          { name: "ground beef", quantity: 700, unit: "g" },
          { name: "soft tofu", quantity: 140, unit: "g" },
          { name: "panko", quantity: 50, unit: "g" },
          { name: "egg", quantity: 1, unit: "large" },
          { name: "oyster sauce", quantity: 2, unit: "tbsp" },
          { name: "ground nutmeg", quantity: 0.25, unit: "tsp" },
          { name: "ground black pepper", quantity: 0.25, unit: "tsp" },
          { name: "vegetable oil", quantity: 2, unit: "tsp" },
        ],
      },
      {
        groupName: "For Sauce", // Another section/category name
        items: [
          { name: "dry red wine", quantity: 0.5, unit: "cup" },
          { name: "ketchup", quantity: 0.33, unit: "cup" },
          { name: "chunou sauce", quantity: 3, unit: "tbsp" },
          { name: "oyster sauce", quantity: 1, unit: "tbsp" },
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
