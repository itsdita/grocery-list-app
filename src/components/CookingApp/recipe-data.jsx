const RECIPE_DATA = [
  {
    id: 1,
    category: ["pasta", "pork"],
    title: "Pasta Carbonara",
    ingredients: [
      { name: "pasta", quantity: { number: 200, unit: "g" } },
      { name: "eggs", quantity: { number: 4, unit: "" } },
      { name: "bacon", quantity: { number: 100, unit: "g" } },
      { name: "parmesan cheese", quantity: { number: 50, unit: "g" } },
      { name: "black pepper", quantity: { number: 1, unit: "tsp" } }
    ],
    instructions:
      "Cook pasta. Fry bacon. Mix eggs, cheese, and pepper. Combine all ingredients.",
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
