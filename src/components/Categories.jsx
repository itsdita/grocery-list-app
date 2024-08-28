import { GROCERIES } from "../data";
import { useState } from "react";

let finalList = [];

const Categories = () => {
  const [list, setList] = useState(finalList);

  function handleCheck(e) {
    setList([...list, e.target.value]);
    if (e.target.checked) {
      finalList.push(e.target.value);
    } else if (!e.target.checked) {
      finalList = finalList.filter((item) => item !== e.target.value);
      setList([...list].filter((item) => item !== e.target.value));
    }
  }

  return (
    <>
      <article className="grocery-list">
        <h2>Groceries</h2>
        <ul id="grocery-list">
          {GROCERIES.map((item, index) => {
            return (
              <li key={index}>
                <input onChange={handleCheck} type="checkbox" value={item} />
                {item}
              </li>
            );
          })}
        </ul>
      </article>
      <article>
        <h2>Final List</h2>
        <ul id="final-list">
          {console.log(list)}
          {list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </article>
    </>
  );
};

export default Categories;
