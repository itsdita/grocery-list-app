import { useEffect, useState } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./util/storage";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGroceries, loadGroceriesFromStorage } from "../../features/groceriesSlice";

import Groceries from "./Groceries";
import FinalList from "./FinalList";
import FinalListHistory from "./FinalListHistory";
import NewItem from "./NewItem";
import { GROCERIES } from "../../data";
import "../../App.css";

const GroceryApp = () => {
  const dispatch = useDispatch();
  const groceries = useSelector((state) => state.groceries.groceries);

  useEffect(() => {
    // First, try to load groceries from local storage
    const storedGroceries = loadFromLocalStorage("groceries", null);

    if (storedGroceries) {
      // If there are groceries in local storage, load them
      dispatch(loadGroceriesFromStorage(storedGroceries));
    } else {
      // If local storage is empty, load from default GROCERIES
      const initialGroceries = GROCERIES.reduce((acc, current) => {
        acc[current.category] = current.items;
        return acc;
      }, {});

      dispatch(loadGroceriesFromStorage(initialGroceries));
    }
  }, [dispatch]);

  // Ensure groceries are saved to local storage after they're initialized
  useEffect(() => {
    if (groceries && Object.keys(groceries).length > 0) {
      saveToLocalStorage("groceries", groceries);
    }
  }, [groceries]);

  const [history, setHistory] = useState([]);
  const [addNewItemVisible, setAddNewItemVisible] = useState(false);
  const [list, setList] = useState(() => loadFromLocalStorage("list", {}));

  useEffect(() => {
    saveToLocalStorage("list", list);
  }, [list]);

  const addNewItem = (item, category, selectedCategory) => {
    dispatch(setGroceries((groceries) => {
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
    }));
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
        {addNewItemVisible && (
          <NewItem groceries={groceries} addNewItem={addNewItem} />
        )}
        <Groceries
          addNewItemVisible={addNewItemVisible}
          setAddNewItemVisible={setAddNewItemVisible}
          groceries={groceries}
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
