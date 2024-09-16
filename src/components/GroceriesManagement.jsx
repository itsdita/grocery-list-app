import { useState } from "react";

import { exportGroceries, handleFileChange } from "../util/fileImportExport";

const GroceriesManagement = ({
  groceries,
  setGroceries,
  showDeleteCategory,
  setShowDeleteCategory,
  showDeleteItem,
  setShowDeleteItem,
  addNewItemVisible,
  setAddNewItemVisible,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const hasItems = Object.values(groceries).some(
    (categoryItems) => categoryItems.length > 0
  );

  return (
    <section id="groceries-management-container">
      <h3 onClick={()=>setIsContentVisible(!isContentVisible)} style={{ cursor: "pointer" }}>
        <span style={{ color: "#7dbfa0" }}>{isContentVisible ? '▼' : '▶'}</span> Manage Groceries
      </h3>
      {isContentVisible && (
        <>
          <button onClick={()=>setAddNewItemVisible(!addNewItemVisible)}>{!addNewItemVisible? "Add New Item":"Hide Add New Item"}</button>
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
            <button onClick={()=>setShowDeleteItem(!showDeleteItem)}>
              {showDeleteItem ? "Hide Delete Item" : "Delete Item"}
            </button>
          )}
          {!!Object.keys(groceries).length && (
            <button onClick={()=>setShowDeleteCategory(!showDeleteCategory)}>
              {showDeleteCategory ? "Hide Delete Category" : "Delete Category"}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default GroceriesManagement;
