import React, { useState, useEffect } from "react";
import "./FinalListHistory.css";

const FinalListHistory = () => {
  const [history, setHistory] = useState([]);
  const [expandedEntries, setExpandedEntries] = useState({});
  const [isHistoryVisible, setIsHistoryVisible] = useState(true); // Add visibility state

  // Fetch history from local storage when the component mounts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  const toggleExpanded = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="history-container">
      <h3
        onClick={() => setIsHistoryVisible(!isHistoryVisible)}
        style={{ cursor: 'pointer' }}
      >
         <span style={{ color: "#7dbfa0" }}>{isHistoryVisible ? '▼' : '▶'}</span> History
      </h3>
      {isHistoryVisible && (
        history.length === 0 ? (
          <p>No history available.</p>
        ) : (
          <ul>
            {history.map((entry, index) => {
              const dateObj = new Date(entry.date);
              const year = dateObj.getFullYear();
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const formattedDate = `${year}-${month}-${day}`;

              const isExpanded = expandedEntries[index];

              return (
                <li key={index}>
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="date-button"
                  >
                    {formattedDate}
                  </button>
                  {isExpanded && (
                    <div className="history-entry-content">
                      {Object.keys(entry.list).map((category, i) => (
                        <div key={i}>
                          <h4>{category}</h4>
                          <ul>
                            {Object.keys(entry.list[category]).map((item, j) => (
                              <li key={j}>
                                {item} - {entry.amounts[category]?.[item] || 0}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )
      )}
    </section>
  );
};

export default FinalListHistory;
