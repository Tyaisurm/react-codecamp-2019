import React, { Component } from "react";
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
        <span>
          <img scr="" alt="img  -" />
        </span>
        <span>{props.name}</span>
        <span className="badge badge-primary m-2 float-sm-right">0</span>
        <button className="btn btn-secondary btn-sm float-sm-right">
          Add +
        </button>
      </li>
    );
  }
}

export default Product;
