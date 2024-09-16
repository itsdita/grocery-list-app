import { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./util/storage";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";
import FinalListHistory from "./components/FinalListHistory";
import NewItem from "./components/NewItem";
import { GROCERIES } from "./data";
import "./App.css";

const App = () => {
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
      console.log(selectedCategory);
      console.log(item);

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

  return (
    <>
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
        <FinalList list={list} resetList={resetList} history={history} setHistory={setHistory}/>
        <FinalListHistory history={history} setHistory={setHistory} />
      </article>
    </>
  );
};

export default App;
