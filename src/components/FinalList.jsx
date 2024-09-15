import React, { useState, useEffect } from "react";
import { handleCopy } from "../util/handleCopy";
import { sanitizeAndValidateInput } from "../util/sanitizeValidateInput";
import FinalListHistory from "./FinalListHistory";
const FinalList = ({ list, resetList }) => {
  const [amounts, setAmounts] = useState({});

  // Initialize amounts state when the list updates
  useEffect(() => {
    const newAmounts = {};
    Object.keys(list).forEach((category) => {
      newAmounts[category] = {};
      Object.keys(list[category]).forEach((item) => {
        newAmounts[category][item] = amounts[category]?.[item] || "";
      });
    });
    setAmounts(newAmounts);
  }, [list]);

  const updateAmount = (category, item, value) => {
    const sanitizedValue = sanitizeAndValidateInput(value);
    setAmounts((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: sanitizedValue,
      },
    }));
  };

  // Function to save the current list and amounts to local storage
  const saveListToHistory = () => {
    // Get existing history from local storage
    const existingHistory = JSON.parse(localStorage.getItem("history")) || [];

    // Create an entry with the current list and amounts
    const newEntry = { list, amounts, date: new Date().toISOString() };

    // Add the new entry to the history
    existingHistory.push(newEntry);

    // Save back to local storage
    localStorage.setItem("history", JSON.stringify(existingHistory));
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
                  <span key={i}>
                    <li className="final-list-item">{item}</li>
                    <input
                      name={item}
                      type="text"
                      value={amounts[category]?.[item] || 0}
                      onChange={(e) =>
                        updateAmount(category, item, e.target.value)
                      }
                    />
                  </span>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <section id="list-management-container">
        <button onClick={() => handleCopy(list, amounts)}>Copy List</button>
        <button onClick={saveListToHistory}>Save to History</button>
        <button onClick={resetList}>Reset List</button>
      </section>
      <FinalListHistory />
    </article>
  );
};

export default FinalList;
