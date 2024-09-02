import { handleCopy } from "../util/handleCopy";

const FinalList = ({ list, resetList }) => {
  return (
    <article className="final-list">
      <h2>Final List</h2>
      {Object.keys(list).length === 0 ? (
        <div className="final-list-container">
          <h3>Welcome</h3>
          <div>
            <p>Click on the checkboxes to add items to the list.</p>
          </div>
        </div>
      ) : (
        <div className="final-list-container">
          {Object.keys(list).map((category, index) => (
            <div key={index} className="category-container">
              <h3>{category}</h3>
              <ul>
                {Object.keys(list[category]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <section id="list-management-container">
        <h3>Manage Final List</h3>
        <button onClick={() => handleCopy(list)}>Copy List</button>
        <button onClick={resetList}>Reset List</button>
      </section>
    </article>
  );
};

export default FinalList;
