import { useEffect, useState } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./util/storage";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroceries,
  loadGroceriesFromStorage,
} from "../../features/groceriesSlice";

import Groceries from "./Groceries";
import FinalList from "./FinalList";
import FinalListHistory from "./FinalListHistory";
import NewItem from "./NewItem";
import { GROCERIES } from "../../data";
import "../../App.css";

const GroceryApp = () => {
  const dispatch = useDispatch();
  const groceries = useSelector((state) => state.groceries.groceries);

  // Load groceries from localStorage or from default data
  useEffect(() => {
    const storedGroceries = loadFromLocalStorage("groceries", null);

    if (storedGroceries) {
      dispatch(loadGroceriesFromStorage(storedGroceries));
    } else {
      const initialGroceries = GROCERIES.reduce((acc, current) => {
        acc[current.category] = current.items;
        return acc;
      }, {});
      dispatch(loadGroceriesFromStorage(initialGroceries));
    }
  }, [dispatch]);

  // Save groceries to localStorage whenever they change
  useEffect(() => {
    if (groceries && Object.keys(groceries).length > 0) {
      saveToLocalStorage("groceries", groceries);
    }
  }, [groceries]);

  const [history, setHistory] = useState([]);
  const [addNewItemVisible, setAddNewItemVisible] = useState(false);
  const [list, setList] = useState(() => loadFromLocalStorage("list", {}));

  // Save list to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("list", list);
  }, [list]);

  const addNewItem = (item, category, selectedCategory) => {
    // Create a shallow copy of the groceries state to ensure immutability
    const updatedGroceries = { ...groceries };

    // Check if the selected category exists
    if (updatedGroceries[selectedCategory]) {
      // Create a new array to avoid mutating the original one
      updatedGroceries[selectedCategory] = [
        ...updatedGroceries[selectedCategory],
      ];

      // If the item doesn't exist in the selected category, add it
      if (!updatedGroceries[selectedCategory].includes(item)) {
        updatedGroceries[selectedCategory].push(item);
      }
    } else {
      // If the category doesn't exist, create a new array for the category
      updatedGroceries[category] = updatedGroceries[category]
        ? [...updatedGroceries[category]]
        : [];

      // Add the item to the new category array
      if (!updatedGroceries[category].includes(item)) {
        updatedGroceries[category].push(item);
      }
    }

    // Dispatch the updated groceries state to the store
    dispatch(setGroceries(updatedGroceries));
  };

  // Reset the list
  const resetList = () => {
    const resetState = { ...list };
    Object.keys(resetState).forEach((category) => {
      Object.keys(resetState[category]).forEach((item) => {
        resetState[category][item] = false;
      });
    });
    setList({});
  };

  // Fetch history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div id="grocery-app-container">
        {addNewItemVisible && <NewItem addNewItem={addNewItem} />}
        <Groceries
          addNewItemVisible={addNewItemVisible}
          setAddNewItemVisible={setAddNewItemVisible}
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
