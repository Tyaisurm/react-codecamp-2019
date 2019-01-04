import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductList from "./components/productList";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ProductList />
      </div>
    );
  }
}

export default App;
