import { exportGroceries, handleFileChange } from "../util/fileImportExport";

const GroceriesManagement = ({
  groceries,
  setGroceries,
  showDeleteCategory,
  showDeleteItem,
  setShowDeleteCategory,
  setShowDeleteItem,
}) => {
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
      <h3>Manage Groceries</h3>
      <button onClick={() => exportGroceries(groceries)}>
        Export Grocery List
      </button>
      <div id="import-file">
        <input
          type="file"
          id="fileInput"
          onChange={()=>handleFileChange(event,setGroceries)}
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
    </section>
  );
};

export default GroceriesManagement;
