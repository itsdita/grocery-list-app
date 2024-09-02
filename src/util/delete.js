export const handleDeleteItem = (category, item, setGroceries, updateList) => {
  setGroceries((prevGroceries) => {
    const updatedGroceries = { ...prevGroceries };
    updatedGroceries[category] = updatedGroceries[category].filter(
      (i) => i !== item
    );
    if (updatedGroceries[category].length === 0) {
      delete updatedGroceries[category]; // Optionally remove the category if empty
    }
    return updatedGroceries;
  });
  updateList((prevList) => {
    const updatedList = { ...prevList };
    if (updatedList[category]) {
      delete updatedList[category][item];
      if (Object.keys(updatedList[category]).length === 0) {
        delete updatedList[category];
      }
    }
    return updatedList;
  });
};
export const handleDeleteCategory = (category, setGroceries, updateList) => {
  // Confirmation dialog
  if (
    window.confirm(
      "Are you sure you want to delete this category and all its items?"
    )
  ) {
    setGroceries((prevGroceries) => {
      const updatedGroceries = { ...prevGroceries };
      delete updatedGroceries[category];
      return updatedGroceries;
    });

    updateList((prevList) => {
      const updatedList = { ...prevList };
      delete updatedList[category];
      return updatedList;
    });
  }
};
