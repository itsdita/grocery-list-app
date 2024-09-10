import { useState } from "react";

import { exportGroceries, handleFileChange } from "../util/fileImportExport";

const GroceriesManagement = ({
  groceries,
  setGroceries,
  showDeleteCategory,
  setShowDeleteCategory,
  showDeleteItem,
  setShowDeleteItem,
  isAddNewItemVisible,
  setAddNewItemVisible,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleAddNewItem = () => {
    setAddNewItemVisible(!isAddNewItemVisible);
  };

  const toggleDeleteModeItem = () => {
    setShowDeleteItem(!showDeleteItem);
  };

  const toggleDeleteModeCategory = () => {
    setShowDeleteCategory(!showDeleteCategory);
  };

  const hasItems = Object.values(groceries).some(
    (categoryItems) => categoryItems.length > 0
  );

  return (
    <section id="groceries-management-container">
      <h3 onClick={toggleContentVisibility} style={{ cursor: "pointer" }}>
        Manage Groceries{" "}
        <span style={{ color: "#7dbfa0" }}>{isContentVisible ? "▼" : "▲"}</span>
      </h3>
      {isContentVisible && (
        <>
          <button onClick={toggleAddNewItem}>Add New Item</button>
          <button onClick={() => exportGroceries(groceries)}>
            Export Grocery List
          </button>
          <div id="import-file">
            <input
              type="file"
              id="fileInput"
              onChange={() => handleFileChange(event, setGroceries)}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              Import Grocery List
            </label>
          </div>
          {hasItems && (
            <button onClick={toggleDeleteModeItem}>
              {showDeleteItem ? "Hide Delete Item" : "Delete Item"}
            </button>
          )}
          {!!Object.keys(groceries).length && (
            <button onClick={toggleDeleteModeCategory}>
              {showDeleteCategory ? "Hide Delete Category" : "Delete Category"}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default GroceriesManagement;
