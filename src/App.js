import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
import { product } from "./components/constants";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketDrinks: 0,
      basketSum: 0
    }
    this.addBasket = this.addBasket.bind(this);
  }

  addBasket(amount) {
    this.setState({
      basketDrinks: this.state.basketDrinks + amount,
      basketSum: this.refs["plist"].getTotalPrice()
    })
  }

  render() {
    return (
      <div>
        <Navigation totalDrinks={this.state.basketDrinks} totalSum = {this.state.basketSum}/>
        <ProductsList product={product} addBasket={this.addBasket} ref="plist" />
      </div>
    );
  }
}

export default App;
