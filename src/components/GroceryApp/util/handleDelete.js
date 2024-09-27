import { setGroceries } from "../../../features/groceriesSlice";

export const handleDeleteItem = (category, item, updateList, dispatch, groceries) => {
  // Compute the new groceries state outside of the dispatch
  const updatedGroceries = { ...groceries };
  updatedGroceries[category] = updatedGroceries[category].filter(
    (i) => i !== item
  );
  
  if (updatedGroceries[category].length === 0) {
    delete updatedGroceries[category]; // Optionally remove the category if empty
  }

  // Dispatch the new state
  dispatch(setGroceries(updatedGroceries));

  // Update the list similarly
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

export const handleDeleteCategory = (category, updateList, dispatch, groceries) => {
  // Confirmation dialog
  if (
    window.confirm(
      "Are you sure you want to delete this category and all its items?"
    )
  ) {
    // Compute the new groceries state
    const updatedGroceries = { ...groceries };
    delete updatedGroceries[category];

    // Dispatch the new state
    dispatch(setGroceries(updatedGroceries));

    // Update the list similarly
    updateList((prevList) => {
      const updatedList = { ...prevList };
      delete updatedList[category];
      return updatedList;
    });
  }
};
