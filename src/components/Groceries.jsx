import { GROCERIES } from "../data";

const Groceries = ({ updateList }) => {
  function handleCheck(e) {
    const item = e.target.value;
    if (e.target.checked) {
      updateList((prevList) => [...prevList, item]);
    } else {
      updateList((prevList) => prevList.filter((i) => i !== item));
    }
  }

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {GROCERIES.map((category, index) => {
        return (
          <ul key={index} className="grocery-list">
            <h3>{category.category}</h3>
            {category.items.map((item, index) => (
              <li key={index}>
                <input onChange={handleCheck} type="checkbox" value={item} />
                {item}
              </li>
            ))}
          </ul>
        );
      })}
    </article>
  );
};

export default Groceries;
