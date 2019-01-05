import React, { Component } from "react";
import beer from "../images/beer.png";
require("../images/beer.png");
console.log(beer);
class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      price: props.startprice,
      pricemin: props.startprice,
      pricemax: props.startprice
    }
    this.addToBasket = this.addToBasket.bind(this)
    this.setPrice = this.setPrice.bind(this)
  }
  
  render() {
    return this.prod(this.props);
  }

  addToBasket() {
    this.setState({
      count: this.state.count + 1
    })
    this.props.raise(this.props.id)
  }

  setPrice(change) { // change is the coefficient. change = 1.05 would mean rise of 5% in price
    let nuprice = change * this.state.price;
    
    this.setState({
      price: nuprice
    })
    if (this.state.pricemax < nuprice) {
      this.setState({
        pricemax: nuprice
      })
    }
    if (this.state.pricemin > nuprice) {
      this.setState({
        pricemin: nuprice
      })
    }
  }

  prod(props) {
    return (
      <li className="list-group-item">
        <blockquote className="blockquote">
          <p className="mb-0">
            <img src={beer} alt="beer" width="45" height="50" />
            {props.name}
          </p>

          <span
            name="quantity"
            className="badge badge-warning m-2 float-sm-right"
          >
            {this.state.count}
          </span>
          <button
            name="addToCart"
            className="btn btn-primary m-2 btn-sm float-sm-right"
            onClick={this.addToBasket}
          >
            Add +
          </button>
          <span
            name="currentPrice"
            className="badge badge-dark m-2 float-sm-right"
            style={this.style}
          >
            $ {this.state.price.toFixed(2)}
          </span>
          <span
            name="intraDayHighestPrice"
            className="badge badge-pill badge-success m-2 float-sm-right"
          >
            $ {this.state.pricemax.toFixed(2)}
          </span>
          <span
            name="intraDayLowestPrice"
            className="badge badge-pill badge-danger m-2 float-sm-right"
          >
            $ {this.state.pricemin.toFixed(2)}
          </span>

          <footer className="blockquote-footer">
            <cite title="type">{props.description}</cite>
          </footer>
        </blockquote>
      </li>
    );
  }
}

export default Product;
