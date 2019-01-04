import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
const product = [
  { id: 1, name: "Karu" },
  { id: 2, name: "Sandels" },
  { id: 3, name: "Saimaa Brew" },
  { id: 4, name: "Indian Ale" },
  { id: 5, name: "Indian Ale" },
  { id: 6, name: "Indian Ale" },
  { id: 7, name: "Indian Ale" },
  { id: 8, name: "Indian Ale" },
  { id: 9, name: "Indian Ale" },
  { id: 10, name: "Indian Ale" }
];
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ProductsList product={product} />
      </div>
    );
  }
}

export default App;
