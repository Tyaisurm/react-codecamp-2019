import React, { Component } from "react";
import beer from "../images/beer.png";
require("../images/beer.png");
console.log(beer);
class Product extends Component {
  state = {
    count: 0
  };
  render() {
    return this.prod(this.props);
  }
  prod(props) {
    return (
      <li className="list-group-item">
        <blockquote className="blockquote">
          <p className="mb-0">
            <img src={beer} alt="beer" width="60" height="60" />
            {props.name}
          </p>

          <span className="badge badge-primary m-2 float-sm-right">0</span>
          <button className="btn btn-secondary btn-sm float-sm-right">
            Add +
          </button>
          <span className="badge badge-info m-2 float-sm-right">$ 4,50</span>
          <span className="badge badge-success m-2 float-sm-right">$ 5,50</span>
          <span className="badge badge-danger m-2 float-sm-right">$ 4,50</span>

          <footer className="blockquote-footer">
            <cite title="type">{props.description}</cite>
          </footer>
        </blockquote>
      </li>
    );
  }
}

export default Product;
