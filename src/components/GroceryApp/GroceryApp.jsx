import { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./util/storage";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Groceries from "./Groceries";
import FinalList from "./FinalList";
import FinalListHistory from "./FinalListHistory";
import NewItem from "./NewItem";
import { GROCERIES } from "../../data";
import "../../App.css";

const GroceryApp = () => {
  const [history, setHistory] = useState([]);
  const [addNewItemVisible, setAddNewItemVisible] = useState(false);
  const [groceries, setGroceries] = useState(() =>
    loadFromLocalStorage(
      "groceries",
      GROCERIES.reduce((acc, current) => {
        acc[current.category] = current.items;
        return acc;
      }, {})
    )
  );
  const [list, setList] = useState(() => loadFromLocalStorage("list", {}));
  useEffect(() => {
    saveToLocalStorage("groceries", groceries);
  }, [groceries]);

  useEffect(() => {
    saveToLocalStorage("list", list);
  }, [list]);

  let updatedGroceries = groceries;

  const addNewItem = (item, category, selectedCategory) => {
    setGroceries((groceries) => {
      const updatedGroceries = { ...groceries };

      if (updatedGroceries[selectedCategory]) {
        if (!updatedGroceries[selectedCategory].includes(item)) {
          updatedGroceries[selectedCategory].push(item);
        }
      } else if (!updatedGroceries[category]) {
        updatedGroceries[category] = [];
        if (!updatedGroceries[category].includes(item)) {
          updatedGroceries[category].push(item);
        }
      }
      return updatedGroceries;
    });
  };
  const resetList = () => {
    const resetState = { ...list };
    Object.keys(resetState).forEach((category) => {
      Object.keys(resetState[category]).forEach((item) => {
        resetState[category][item] = false;
      });
    });
    setList({});
  };

  // Fetch history from local storage when the app mounts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div id="grocery-app-container">
        {addNewItemVisible && (
          <NewItem groceries={updatedGroceries} addNewItem={addNewItem} />
        )}
        <Groceries
          addNewItemVisible={addNewItemVisible}
          setAddNewItemVisible={setAddNewItemVisible}
          groceries={updatedGroceries}
          setGroceries={setGroceries}
          list={list}
          updateList={setList}
        />
        <article className="final-list">
          <FinalList
            list={list}
            resetList={resetList}
            history={history}
            setHistory={setHistory}
          />
          <FinalListHistory history={history} setHistory={setHistory} />
        </article>
      </div>
      <section id="back-to-main-menu">
        <button onClick={() => handleClick("/")}>BACK TO MAIN MENU</button>
      </section>
    </>
  );
};

export default GroceryApp;
