import React from "react";
import "./App.css";
import ClickCounter from "./ClickCounter";
import Search from "./Components/Search";
import Voter from "./Counter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClickCounter />
        <Voter />
        <Search />
      </header>
    </div>
  );
}

export default App;
