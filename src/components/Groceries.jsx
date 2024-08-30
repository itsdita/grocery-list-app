import { useState } from "react";

/* Groceries component receives the updateList function as a prop*/
const Groceries = ({ updateList, setGroceries, groceries, list }) => {
  const [showDelete, setShowDelete] = useState(false);

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

  const toggleDeleteMode = () => {
    setShowDelete(!showDelete);
  };

  const handleDelete = (category, item) => {
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

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {/* iterating over all objects in GROCERIES array
      group is category */}
      <div className="grocery-list-container">
        {Object.keys(groceries).map((category, index) => (
          <div key={index} className="category-container">
            {/* accessing the key that holds the name of the category */}
            <h3>{category}</h3>
            <ul className="grocery-list">
              {/* iterating over array of items in a category */}
              {groceries[category].map((item, i) => (
                <li key={i}>
                  <input
                    /* passing the event and the category name to handleCheck function */
                    onChange={(e) => handleCheck(e, category, item)}
                    type="checkbox"
                    checked={(list[category] && list[category][item]) || false}
                    value={item}
                  />
                  {item}
                  {showDelete && (
                    <button
                      className="delete-icon"
                      onClick={() => handleDelete(category, item)}
                    >
                      x
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={toggleDeleteMode}>
          {showDelete ? "Hide Delete Items" : "Delete Items"}
        </button>
      </div>
    </article>
  );
};

export default Groceries;
