import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
import Cart from "./containers/cart";
const product = [
  {
    id: 1,
    name: "Karhu",
    description:
      "a pale lager with a strong taste. Karhu meaning bear in Finnish"
  },
  {
    id: 2,
    name: "Sandels",
    description:
      "named after the Swedish marshal and war hero of the Finnish War, Johan August Sandels."
  },
  {
    id: 3,
    name: "Saimaa Brew",
    description: "locally brewed in Saimaa region"
  },
  {
    id: 4,
    name: "Indian Pale Ale",
    description: "hoppy beer style, brewed from pale malt "
  },
  {
    id: 5,
    name: "Kingfisher",
    description: "popular indian beer "
  }
];
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route
            exact
            path="/"
            component={<ProductsList product={product} />}
          />
          <Route path="/cart" component={Cart} />
        </div>
      </Router>
    );
  }
}

export default App;
