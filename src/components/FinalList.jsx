const FinalList = ({ list }) => {
  return (
    <article>
      <h2>Final List</h2>
      {Object.keys(list).map((category, index) => (
        <div key={index}>
          <h3>{category}</h3>
          <ul className="final-list">
            {list[category].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
};

export default FinalList;
