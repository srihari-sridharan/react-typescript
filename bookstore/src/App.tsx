import React from "react";
import "./App.css";
import ClickCounter from "./ClickCounter";
import FriendStatus from "./Components/FriendStatus";
import MyNewComponent from "./Components/MyNewComponent";
import Search from "./Components/Search";
import ButtonApp from "./Components/ThemedButton";
import Voter from "./Voter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonApp></ButtonApp>
        <MyNewComponent name="Srihari" team="SIMS Insights" />
        <ClickCounter />
        <Voter />
        <Search />
        <FriendStatus />
      </header>
    </div>
  );
}

export default App;
