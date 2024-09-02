import { useState } from "react";
import { handleDeleteItem, handleDeleteCategory } from "../util/delete";

/* Groceries component receives the updateList function as a prop*/
const Groceries = ({ updateList, setGroceries, groceries, list }) => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  /* the funcion handleCheck is called when the checkbox is clicked
  it receives the event and the category name as arguments */
  function handleCheck(e, category, item) {
    /* isChecked is true if the checkbox is checked, false if it's unchecked */
    const isChecked = e.target.checked;

    updateList((prevList) => {
      /* if the category already exists in the list, get the array of items, otherwise create an empty array */
      const updatedCategory = prevList[category]
        ? { ...prevList[category] }
        : {};

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

  const toggleDeleteModeItem = () => {
    setShowDeleteItem(!showDeleteItem);
  };
  const toggleDeleteModeCategory = () => {
    setShowDeleteCategory(!showDeleteCategory);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  const hasItems = Object.values(groceries).some(
    (categoryItems) => categoryItems.length > 0
  );

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {/* iterating over all objects in GROCERIES array
      group is category */}
      <div className="grocery-list-container">
        {Object.keys(groceries).map((category, index) => (
          <div key={index} className="category-container">
            {/* accessing the key that holds the name of the category */}
            <h3 onClick={() => toggleCategory(category)}>{category}</h3>
            {showDeleteCategory && (
              <button
                className="delete-icon"
                onClick={() =>
                  handleDeleteCategory(category, setGroceries, updateList)
                }
              >
                x
              </button>
            )}
            {expandedCategories[category] && (
              <ul className="grocery-list">
                {/* iterating over array of items in a category */}
                {groceries[category].map((item, i) => (
                  <li key={i}>
                    <input
                      /* passing the event and the category name to handleCheck function */
                      onChange={(e) => handleCheck(e, category, item)}
                      type="checkbox"
                      checked={
                        (list[category] && list[category][item]) || false
                      }
                      value={item}
                    />
                    {item}
                    {showDeleteItem && (
                      <button
                        className="delete-icon"
                        onClick={() =>
                          handleDeleteItem(
                            category,
                            item,
                            setGroceries,
                            updateList
                          )
                        }
                      >
                        x
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div id="delete-btn-container">
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
        </div>
      </div>
    </article>
  );
};

export default Groceries;
