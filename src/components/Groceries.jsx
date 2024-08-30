import { GROCERIES } from "../data";

/* Groceries component receives the updateList function as a prop*/
const Groceries = ({ updateList, list }) => {
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
      return { ...prevList, [category]: updatedCategory };
    });
  }

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {/* iterating over all objects in GROCERIES array
      group is category */}
      {GROCERIES.map((group, index) => (
        <div key={index}>
          {/* accessing the key that holds the name of the category */}
          <h3>{group.category}</h3>
          <ul className="grocery-list">
            {/* iterating over array of items in a category */}
            {group.items.map((item, i) => (
              <li key={i}>
                <input
                  /* passing the event and the category name to handleCheck function */
                  onChange={(e) => handleCheck(e, group.category, item)}
                  type="checkbox"
                  checked={(list[group.category] && list[group.category][item]) || false}
                  value={item}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
};

export default Groceries;
