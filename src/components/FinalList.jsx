const FinalList = ({ list, updateList }) => {
  const generateListText = (list) => {
    return Object.keys(list)
      .map(
        (category) =>
          `${category}:\n${list[category]
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

  const resetList = () => {
    updateList({});
  };

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
      <button onClick={handleCopy}>Copy List</button>
      <button onClick={resetList}>Reset List</button>
    </article>
  );
};

export default FinalList;
