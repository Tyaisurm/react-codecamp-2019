import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
import { product } from "./components/constants";
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
