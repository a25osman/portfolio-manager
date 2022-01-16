import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import VirtualizedList from "./components/list";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Tradeable Assets</h1>
      <VirtualizedList />
    </div>
  );
}

export default App;
