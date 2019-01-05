import React, { Component } from "react";
import Product from "./product";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofprods: this.props.product.length
    };
    this.setPrice = this.setPrice.bind(this);
    this.addBasket = this.addBasket.bind(this);
  }

  setPrice(id, pricechange) {
    this.refs["product" + id].setPrice(pricechange);
  }

  addBasket (amount) {
    this.props.addBasket(amount)
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
