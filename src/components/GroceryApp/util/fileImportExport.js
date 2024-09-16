import DOMPurify from "dompurify";

export const exportGroceries = (groceries) => {
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

export const handleFileChange = (event, setGroceries) => {
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
