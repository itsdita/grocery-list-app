import { useState } from "react";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";
import "./App.css";

const App = () => {
  const [list, setList] = useState({});

  const resetList = () => {
    setList({});
  };

  return (
    <>
      <Groceries list={list} updateList={setList} />
      <FinalList list={list} resetList={resetList} />
    </>
  );
};

export default App;
