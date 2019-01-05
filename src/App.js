import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
import { product } from "./components/constants";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketTotal: 0
    }
    this.addBasket = this.addBasket.bind(this);
  }

  addBasket(amount) {
    this.setState({
      basketTotal: this.state.basketTotal + amount
    })
  }

  render() {
    return (
      <div>
        <Navigation total={this.state.basketTotal}/>
        <ProductsList product={product} addBasket={this.addBasket} />
      </div>
    );
  }
}

export default App;
