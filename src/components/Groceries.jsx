import { GROCERIES } from "../data";

const Groceries = ({ updateList }) => {
  function handleCheck(e, category) {
    const item = e.target.value;
    updateList((prevList) => {
      let updatedCategory = prevList[category] || [];

      if (e.target.checked) {
        updatedCategory = [...updatedCategory, item];
      } else {
        updatedCategory = updatedCategory.filter((i) => i !== item);
      }

      const newList = { ...prevList };
      if (updatedCategory.length > 0) {
        newList[category] = updatedCategory;
      } else {
        delete newList[category];
      }

      return newList;
    });
  }

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {GROCERIES.map((group, index) => (
        <div key={index}>
          <h3>{group.category}</h3>
          <ul className="grocery-list">
            {group.items.map((item, i) => (
              <li key={i}>
                <input
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
