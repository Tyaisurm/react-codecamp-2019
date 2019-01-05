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
      basketSum: 0,
      bill: 0
    }
    this.addBasket = this.addBasket.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }

  addBasket(amount) {
    this.setState({
      basketDrinks: this.state.basketDrinks + amount,
      basketSum: this.refs["plist"].getTotalPrice()
    })
  }

  checkOut () {
    this.setState({
      basketDrinks: 0,
      basketSum: 0,
      bill: (parseFloat(this.state.bill) + parseFloat(this.state.basketSum)) // Otherwise it treats it as string for some reason
    })
    this.refs["plist"].checkOut()
  }

  render() {
    return (
      <div>
        <Navigation totalDrinks={this.state.basketDrinks} totalSum={this.state.basketSum} bill={this.state.bill} checkOut={this.checkOut} />
        <ProductsList product={product} addBasket={this.addBasket} ref="plist" />
      </div>
    );
  }
}

export default App;
