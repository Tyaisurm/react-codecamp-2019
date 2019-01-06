import React from "react";
import {Link} from "react-router-dom";

class Navigation extends React.Component {
    render() {
        const {totalDrinks, totalSum, bill, checkOut} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img
                        className="logo"
                        src={require("../logo.png")}
                        alt="Logo"
                        width="60"
                        height="60"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                <Link to={"/products"}>
                                    Browse Drinks <span className="sr-only">(current)</span>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <p className="nav-link" style={{fontWeight: "bold"}}>
                                Your Total bill: $ {bill.toFixed(2)}
                            </p>
                        </li>
                    </ul>
                    <div style={{margin: 10, fontWeight: "bold"}}>
                        Cart : $ {totalSum.toFixed(2)}
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary float-sm-right"
                        onClick={checkOut}
                    >
                        Proceed to Order{" "}
                        <span className="badge badge-light">{totalDrinks}</span>
                        <span className="sr-only">unread messages</span>
                    </button>
                </div>
            </nav>
        );
    }

}

export default Navigation;
