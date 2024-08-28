import { useState } from "react";
import "./App.css";
import Groceries from "./components/Groceries";
import FinalList from "./components/FinalList";

function App() {
  const [list, setList] = useState([]);

  return (
    <>
      <Groceries updateList={setList} />
      <FinalList list={list} />
    </>
  );
}

export default App;
