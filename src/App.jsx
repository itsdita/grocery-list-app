import { useState } from "react";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";
import NewItem from "./components/NewItem";
import { GROCERIES } from "./data";
import "./App.css";

const App = () => {
  const [groceries, setGroceries] = useState(
    GROCERIES.reduce((acc, current) => {
      acc[current.category] = current.items;
      return acc;
    }, {})
  );
  const [list, setList] = useState({});

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

  return (
    <>
      <NewItem groceries={updatedGroceries} addNewItem={addNewItem} />
      <Groceries
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
