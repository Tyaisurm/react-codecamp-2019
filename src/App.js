import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
const product = [
  { id: 1, name: "Karu" },
  { id: 2, name: "Sandels" },
  { id: 3, name: "Saimaa Brew" },
  { id: 4, name: "Indian Ale" }
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
