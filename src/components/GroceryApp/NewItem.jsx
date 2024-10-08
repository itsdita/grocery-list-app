import { useState } from "react";
import {useSelector} from "react-redux";

import { sanitizeAndValidateInput } from "../../global-util/sanitizeValidateInput";

const NewItem = ({ addNewItem, addNewItemToggle }) => {
  const groceries = useSelector((state) => state.groceries.groceries);

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

    const sanitizedItem = sanitizeAndValidateInput(newItem);
    const sanitizedCategory = sanitizeAndValidateInput(newCategory);

    addNewItem(sanitizedItem, sanitizedCategory, selectedCategory);
  };

  return (
    <article ref={addNewItemToggle} className="new-item">
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
