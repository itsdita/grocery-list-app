import React, { useState, useEffect } from "react";
import "./FinalListHistory.css";

const FinalListHistory = ({ history, setHistory }) => {
  const [expandedEntries, setExpandedEntries] = useState({});
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const toggleExpanded = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteEntry = (indexToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (confirmDelete) {
      const updatedHistory = history.filter((_, idx) => idx !== indexToDelete);
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));

      // Remove the entry from expandedEntries state
      setExpandedEntries((prev) => {
        const updatedExpandedEntries = { ...prev };
        delete updatedExpandedEntries[indexToDelete];
        return updatedExpandedEntries;
      });
    }
  };

  return (
    <section id="history-container">
      <h3
        onClick={() => setIsHistoryVisible(!isHistoryVisible)}
        style={{ cursor: "pointer" }}
      >
        <span style={{ color: "#7dbfa0" }}>{isHistoryVisible ? "▼" : "▶"}</span>{" "}
        History
      </h3>
      {isHistoryVisible &&
        (history.length === 0 ? (
          <p>No history available.</p>
        ) : (
          <div id="history-date-list-container">
            {history.map((entry, index) => {
              const dateObj = new Date(entry.date);
              const year = dateObj.getFullYear();
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const formattedDate = `${year}-${month}-${day}`;

              const isExpanded = expandedEntries[index];

              return (
                <div className="date-list" key={index}>
                  <span >
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="date-button"
                    >
                      {formattedDate}
                    </button>
                    <button
                      className="history-delete-btn"
                      onClick={() => deleteEntry(index)}
                    >
                      Delete
                    </button>
                  </span>
                  {isExpanded && (
                    <div className="history-entry-content">
                      {Object.keys(entry.list).map((category, i) => (
                        <div key={i}>
                          <h4>{category}</h4>
                          <ul>
                            {Object.keys(entry.list[category]).map(
                              (item, j) => (
                                <li key={j}>
                                  {item} {entry.amounts[category]?.[item] || ""}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </section>
  );
};

export default FinalListHistory;
