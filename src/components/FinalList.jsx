const FinalList = ({ list }) => {
    return (
      <article>
        <h2>Final List</h2>
        <ul id="final-list">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </article>
    );
  };
  
  export default FinalList;