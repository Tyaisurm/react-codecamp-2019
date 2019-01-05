import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const Cart = () => <h2>Cart</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart/">Cart</Link>
          </li>
          <li>{/* <Link to="/users/">Users</Link> */}</li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/cart/" component={Cart} />
      {/* <Route path="/users/" component={Users} /> */}
    </div>
  </Router>
);

export default AppRouter;
