import { useState } from "react";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";
import "./App.css";

const App = () => {
  const [list, setList] = useState({});

  return (
    <>
      <Groceries updateList={setList} />
      <FinalList list={list} updateList={setList} />
    </>
  );
};

export default App;
