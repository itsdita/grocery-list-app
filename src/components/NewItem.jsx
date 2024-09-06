import { useState } from "react";
import DOMPurify from "dompurify";

const NewItem = ({ groceries, addNewItem }) => {
  const [newItem, setNewItem] = useState("");

  const [newCategory, setNewCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const resetDropdown = () => {
    setSelectedCategory(""); // Resetting to initial state
  };
  const handleAddNewItem = () => {
    if (!newItem.trim() || (!newCategory.trim() && !selectedCategory.trim())) {
      alert("Please fill in all fields");
      return;
    }
    const validInputRegex =
      /^[a-zA-Z0-9\s\-\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Arabic}]+$/u;

    if (
      !validInputRegex.test(newItem) ||
      (!validInputRegex.test(newCategory) && newCategory)
    ) {
      alert("Only alphanumeric characters and spaces are allowed");
      return;
    }

    const sanitizedItem = DOMPurify.sanitize(newItem);
    const sanitizedCategory = DOMPurify.sanitize(newCategory);

    addNewItem(sanitizedItem, sanitizedCategory, selectedCategory);
  };

  return (
    <article className="new-item">
      <h2>Add New Item</h2>
      <h3>Category</h3>
      <select
        id="category-dropdown"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="default">Select existing category</option>
        {Object.keys(groceries).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        {newCategory && !groceries[newCategory] && (
          <option key={newCategory} value={newCategory}>
            {newCategory}
          </option>
        )}
      </select>
      <button onClick={resetDropdown}>Reset Selection</button>
      <input
        id="new-category"
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
      />
      <h3>Item</h3>
      <input
        id="new-item"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddNewItem}>Add Item</button>
    </article>
  );
};

export default NewItem;
