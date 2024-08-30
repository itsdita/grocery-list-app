const FinalList = ({ list, resetList }) => {
  const generateListText = (list) => {
    return Object.keys(list)
      .map(
        (category) =>
          `${category}:\n${Object.keys(list[category])
            .map((item) => `• ${item}`)
            .join("\n")}`
      )
      .join("\n\n");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const handleCopy = () => {
    const listText = generateListText(list);
    copyToClipboard(listText);
  };

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
      <button onClick={handleCopy}>Copy List</button>
      <button onClick={resetList}>Reset List</button>
    </article>
  );
};

export default FinalList;
