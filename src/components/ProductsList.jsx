import React, { Component } from "react";
import Product from "./Product";

class ProductsList extends Component {

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.products.map(p => (
            <Product
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
              price={p.price}
              minPrice={p.minPrice}
              maxPrice={p.maxPrice}
              count={p.count}
              addToBasket={this.props.addToBasket}
              removeFromBasket={this.props.removeFromBasket}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsList;
