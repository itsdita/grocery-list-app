import DOMPurify from "dompurify";

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
  const exportGroceries = (groceries) => {
    const filename = "grocery_list.json";
    const jsonStr = JSON.stringify(groceries);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isValidGroceriesFormat = (data) => {
    return (
      data &&
      typeof data === "object" &&
      Object.keys(data).every((key) => Array.isArray(data[key]))
    );
  };

  const sanitizeGroceries = (groceries) => {
    Object.keys(groceries).forEach((key) => {
      groceries[key] = groceries[key].map((item) => DOMPurify.sanitize(item));
    });
    return groceries;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) {
      alert("No file selected!");
      return;
    }

    if (file.size > 1048576) {
      // Limit file size to 1MB
      alert("File size must not exceed 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      try {
        let groceries = JSON.parse(contents);
        if (isValidGroceriesFormat(groceries)) {
          groceries = sanitizeGroceries(groceries);
          setGroceries(groceries);
          console.log("File loaded successfully!");
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        alert("Error reading file: " + error);
      }
    };
    reader.readAsText(file);
  };

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
          onChange={handleFileChange}
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
