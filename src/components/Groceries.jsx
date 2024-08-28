import { GROCERIES } from "../data";

/* Groceries component receives the updateList function as a prop*/
const Groceries = ({ updateList }) => {
  /* the funcion handleCheck is called when the checkbox is clicked
  it receives the event and the category name as arguments */
  function handleCheck(e, category) {
    /* assign the value of the checkbox to a variable */
    const item = e.target.value;

    updateList((prevList) => {
     /*  assign the value of the category to a variable or an empty array if the category doesn't exist */
      let updatedCategory = prevList[category] || [];

      if (e.target.checked) {
        /* if the event is 'check' spread the updatedCategory array and add the new item */
        updatedCategory = [...updatedCategory, item];
      } else {
        /* if the event is 'uncheck' filter the updatedCategory array and remove the item */
        updatedCategory = updatedCategory.filter((i) => i !== item);
      }
      /* new object with the updated category */
      const newList = { ...prevList };
      /* if the updatedCategory array has items, add it to the newList object, otherwise delete the category */
      if (updatedCategory.length > 0) {
        newList[category] = updatedCategory;
      } else {
        delete newList[category];
      }
      /* return the newList object, which is used as list in Main component */
      return newList;
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
                  onChange={(e) => handleCheck(e, group.category)}
                  type="checkbox"
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
