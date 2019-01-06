import React, { Component } from "react";
import Product from "./Product";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofprods: this.props.product.length
    };
    this.setPrice = this.setPrice.bind(this);
    this.addBasket = this.addBasket.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }

  setPrice(id, pricechange) {
    this.refs["product" + id].setPrice(pricechange);
  }

  addBasket (amount) {
    this.props.addBasket(amount)
  }

  getTotalPrice () {
    let i;
    let sum = 0;
    for (i = 1; i < this.state.numberofprods + 1; i++) {
      sum += this.refs["product" + i].getPrice();
    }
    return sum.toFixed(2)
  }

  checkOut(totaldrinks) {
    let i;
    for (i = 1; i < this.state.numberofprods + 1; i++) {
      let count = this.refs["product" + i].state.count;

      if (count !== 0) {
        this.refs["product" + i].setPrice(1.005 ** count) // Increase price by 0.5% per sold drink
      } else {
        this.refs["product" + i].setPrice(0.98) // Drop price by 2% if nobody bought it this time
      }
      this.refs["product" + i].resetCount();
    }
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.product.map(p => (
            <Product
              key={p.id}
              ref={"product" + p.id}
              id={p.id} // This needs to be separate for reasons
              name={p.name}
              description={p.description}
              startprice={p.startprice}
              raise={this.addBasket}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsList;
