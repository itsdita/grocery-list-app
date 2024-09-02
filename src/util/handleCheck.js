/* the funcion handleCheck is called when the checkbox is clicked
  it receives the event and the category name as arguments */
export function handleCheck(e, category, item, updateList) {
  /* isChecked is true if the checkbox is checked, false if it's unchecked */
  const isChecked = e.target.checked;

  updateList((prevList) => {
    /* if the category already exists in the list, get the array of items, otherwise create an empty array */
    const updatedCategory = prevList[category] ? { ...prevList[category] } : {};

    if (isChecked) {
      updatedCategory[item] = true;
    } else {
      /* if the item is unchecked, delete it from the updatedCategory object */
      delete updatedCategory[item];
    }

    if (Object.keys(updatedCategory).length === 0) {
      const { [category]: _, ...rest } = prevList;
      return rest;
    }
    const a = { ...prevList, [category]: { ...updatedCategory } };
    console.log(a);
    return { ...prevList, [category]: { ...updatedCategory } };
  });
}
