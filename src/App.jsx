import React, {Component} from "react";
import "./App.css";
import Navigation from "./containers/Navigation";
import ProductsList from "./components/ProductsList";
import {MAX_COUNT, MAX_PRICE, MIN_PRICE, products} from "./fake/constants";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Cart from "./containers/Cart";
import NoMatch from "./components/NoMatch";
import ErrorHandler from "./components/ErrorHandler";
import {toast} from "react-toastify";

class App extends Component {
    state = {
        basketSum: 0,
        drinksCount: 0,
        bill: 0,
        products: products.map(p => {
            p.count = 0;
            p.minPrice = p.maxPrice = p.price;
            return p;
        })
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                        <>
                            <Navigation
                                totalDrinks={this.state.drinksCount} // sum all counts
                                totalSum={this.state.basketSum}
                                bill={this.state.bill}
                                checkOut={this.checkOut}
                            />
                            <Switch>
                                <Route
                                    path={'/products'}
                                    exact={true}
                                    component={() => <ProductsList
                                        products={this.state.products}
                                        addToBasket={this.addToBasket}
                                        removeFromBasket={this.removeFromBasket}
                                    />}
                                />
                                <Route path={'/cart'} exact={true} component={Cart}/>
                                <Route component={NoMatch}/>
                            </Switch>
                            <ErrorHandler/>
                        </>
                </BrowserRouter>
            </div>
        );
    }

    checkOut = () => {
        if (this.state.drinksCount === 0) {
            this.showError('You have no products in your Cart!');
        } else {
            this.updatePrices();
            this.updateBasket();
            this.setState({
                bill: (parseFloat(this.state.bill) + parseFloat(this.state.basketSum)), // Otherwise it treats it as string for some reason
                basketDrinks: 0,
                basketSum: 0
            })
        }
    }

    updatePrices() {
        const resetProducts = products.map(p => {
            p.price = p.count !== 0 // javascript ternary operator
                ? 1.02 ** p.count * p.price // do it if price is not equal to 0
                : 0.995 * p.price; // do otherwise if it is
            if (p.price > MAX_PRICE)
                p.price = MAX_PRICE;
            if (p.price < MIN_PRICE)
                p.price = MIN_PRICE;
            p.count = 0;
            if (p.price > p.maxPrice) {
                p.maxPrice = p.price;
            } else {
                p.minPrice = p.price;
            }
            return p;
        });

        this.setState({
            products: resetProducts
        });
    }

    addToBasket = (productId) => {
        if (this.state.drinksCount === MAX_COUNT) {
            this.showError(`You can't buy more than ${MAX_COUNT} products!`);
        } else {
            this.setState({
                products: this.state.products.map(p => {
                    if (p.id === productId) {
                        p.count++;
                    }
                    return p;
                })
            });

            this.updateBasket();
        }
    }

    removeFromBasket = (productId) => {
        this.setState({
            products: this.state.products.map(p => {
                if (p.id === productId && p.count > 0) {
                    p.count--;
                }
                return p;
            })
        });

        this.updateBasket();
    }

    updateBasket = () => {
        const allDrinks = this.state.products
            .map(p => p.count) // map products to their counts
            .reduce((sumOfCounts, currentCount) => sumOfCounts + currentCount);

        const sumPrice = this.state.products
            .map(p => p.price * p.count) // map products to their counts times prices
            .reduce((sumOfPrices, currentPrice) => sumOfPrices + currentPrice);

        this.setState({
            drinksCount: allDrinks,
            basketSum: sumPrice,
        });
    }

    showError = (errorMessage) => {
        toast.error(errorMessage, {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
}

export default App;
