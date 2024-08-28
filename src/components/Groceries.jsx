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
      <ul id="grocery-list">
        {GROCERIES.map((item, index) => (
          <li key={index}>
            <input onChange={handleCheck} type="checkbox" value={item} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Groceries;
