import React, { Component } from "react";
import Product from "./product";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofprods: this.props.product.length
    };
    this.raisePrice = this.raisePrice.bind(this);
  }

  raisePrice(id) {
    // As it works: When you purchase something (or now just add it to the basket), its price rises by 5% and all the others drop by 2%.
    let i;
    for (i = 1; i < this.state.numberofprods + 1; i++) {
      if (i === id) {
        this.refs["product" + i].setPrice(1.05);
      } else {
        this.refs["product" + i].setPrice(0.98);
      }
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
              raise={this.raisePrice}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsList;
