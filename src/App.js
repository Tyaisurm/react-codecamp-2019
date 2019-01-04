import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/navigation";
import ProductsList from "./components/productsList";
const product = [
  {
    id: 1,
    name: "Karhu",
    startprice: 5.00,
    description:
      "a pale lager with a strong taste. Karhu meaning bear in Finnish"
  },
  {
    id: 2,
    startprice: 5.40,
    name: "Sandels",
    description:
      "named after the Swedish marshal and war hero of the Finnish War, Johan August Sandels."
  },
  {
    id: 3,
    startprice: 6.20,
    name: "Saimaa Brew",
    description: "locally brewed in Saimaa region"
  },
  {
    id: 4,
    startprice: 4.00,
    name: "Indian Pale Ale",
    description: "hoppy beer style, brewed from pale malt "
  },
  {
    id: 5,
    startprice: 4.50,
    name: "Kingfisher",
    description: "popular indian beer "
  }
];
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ProductsList product={product} />
      </div>
    );
  }
}

export default App;
