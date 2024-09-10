import { useState, useEffect, useRef } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./util/storage";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";
import NewItem from "./components/NewItem";
import { GROCERIES } from "./data";
import "./App.css";

const App = () => {
  const [isAddNewItemVisible, setAddNewItemVisible] = useState(false);
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
      console.log(updatedGroceries);
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

  const handleToggleClass = () => {
    if (addNewItemToggle.current) {
      addNewItemToggle.current.classList.toggle("hide");
    }
  };

  return (
    <>
      {isAddNewItemVisible && (
        <NewItem groceries={updatedGroceries} addNewItem={addNewItem} />
      )}
      <Groceries
        isAddNewItemVisible={isAddNewItemVisible}
        setAddNewItemVisible={setAddNewItemVisible}
        handleToggleClass={handleToggleClass}
        groceries={updatedGroceries}
        setGroceries={setGroceries}
        list={list}
        updateList={setList}
      />
      <FinalList list={list} resetList={resetList} />
    </>
  );
};

export default App;
