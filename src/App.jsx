import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/Navigation";
import ProductsList from "./components/ProductsList";
import { products } from "./fake/constants";
class App extends Component {
  state = {
      basketSum: 0,
      drinksCount: 0,
      bill: 0,
      products: products.map(p => {
          p.count = 0;
          p.minPrice = p.maxPrice = p.price;
          return p;
      })
    };

  render() {
      return (
          <div>
              <Navigation
                  totalDrinks={this.state.drinksCount} // sum all counts
                  totalSum={this.state.basketSum}
                  bill={this.state.bill}
                  checkOut={this.checkOut}
              />
              <ProductsList
                  products={this.state.products}
                  addToBasket={this.addToBasket}
                  removeFromBasket={this.removeFromBasket}
              />
          </div>
      );
  }

  checkOut = () => {
    this.updatePrices();
    this.updateBasket();
    this.setState({
      bill: (parseFloat(this.state.bill) + parseFloat(this.state.basketSum)), // Otherwise it treats it as string for some reason
      basketDrinks: 0,
      basketSum: 0
    })
  }

  updatePrices() {
      const resetProducts = products.map(p => {
        p.price = p.count !== 0 // javascript ternary operator
          ? 1.005 ** p.count * p.price // do it if price is not equal to 0
          : 0.98 * p.price; // do otherwise if it is
        p.count = 0;
        if (p.price > p.maxPrice) {
          p.maxPrice = p.price;
        } else {
          p.minPrice = p.price;
        }
        return p;
      });

      this.setState({
          products: resetProducts
      });
  }

  addToBasket = (productId) => {
    this.setState({
        products: this.state.products.map(p => {
          if(p.id === productId) {
            p.count ++;
          }
          return p;
        })
    });

    this.updateBasket();
  }

  removeFromBasket = (productId) => {
      this.setState({
          products: this.state.products.map(p => {
              if(p.id === productId && p.count > 0) {
                  p.count --;
              }
              return p;
          })
      });

      this.updateBasket();
  }

  updateBasket = () => {
      const allDrinks = this.state.products
          .map(p => p.count) // map products to their counts
          .reduce((sumOfCounts, currentCount) => sumOfCounts + currentCount);

      const sumPrice = this.state.products
          .map(p => p.price * p.count) // map products to their counts times prices
          .reduce((sumOfPrices, currentPrice) => sumOfPrices + currentPrice);

      this.setState({
          drinksCount: allDrinks,
          basketSum: sumPrice,
      });
  }
}

export default App;
