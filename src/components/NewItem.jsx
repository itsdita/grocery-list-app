import { useState } from "react";

const NewItem = ({ groceries, addNewItem }) => {
  const [newItem, setNewItem] = useState("");

  const [newCategory, setNewCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const resetDropdown = () => {
    setSelectedCategory(""); // Resetting to initial state
  };

  return (
    <article>
      <h2>Add New Item</h2>
      <h3>Pick Existing Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>
          Pick a category
        </option>
        {Object.keys(groceries).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        {newCategory && !groceries[newCategory] && (
          <option value={newCategory}>{newCategory}</option>
        )}
      </select>
      <button onClick={resetDropdown}>Reset Category</button>
      <h3>Add New Category</h3>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
      />
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button
        onClick={() => addNewItem(newItem, newCategory, selectedCategory)}
      >
        Add Item
      </button>
    </article>
  );
};

export default NewItem;
