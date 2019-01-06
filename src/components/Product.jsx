import React from "react";
import beer from "../images/beer.png";
require("../images/beer.png");

const Product = (props) => {
    return (
      <li className="list-group-item">
        <blockquote className="blockquote">
          <p className="mb-0">
            <img src={beer} alt="beer" width="45" height="50" />
            {props.name}
          </p>

          <button
            name="removeFromCart"
            className="btn btn-danger m-2 btn-sm float-sm-right"
            onClick={() => props.removeFromBasket(props.id)}
          >
            -
          </button>
          <button
            name="addToCart"
            className="btn btn-primary m-2 btn-sm float-sm-right"
            onClick={() => props.addToBasket(props.id)}
          >
            +
          </button>
          <span
            name="quantity"
            className="badge badge-warning m-2 float-sm-right"
          >
            {props.count}
          </span>
          <span
            name="currentPrice"
            className="badge badge-dark m-2 float-sm-right"
          >
            $ {props.price.toFixed(2)}
          </span>
          <span
            name="intraDayHighestPrice"
            className="badge badge-pill badge-success m-2 float-sm-right"
          >
            $ {props.maxPrice.toFixed(2)}
          </span>
          <span
            name="intraDayLowestPrice"
            className="badge badge-pill badge-danger m-2 float-sm-right"
          >
            $ {props.minPrice.toFixed(2)}
          </span>

          <footer className="blockquote-footer">
            <cite title="type">{props.description}</cite>
          </footer>
        </blockquote>
      </li>
    );
}

export default Product;
