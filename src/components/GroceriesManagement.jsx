const GroceriesManagement = ({
  groceries,
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
