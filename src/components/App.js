import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Catalogue from "./Catalogue/Catalogue";
import AddProduct from "./Product/AddProduct/AddProduct";
import Cart from "./Cart/Cart";
import EditProduct from "./Product/EditProduct/EditProduct";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <Cart />
          <Switch>
            <Route path="/" exact component={Catalogue} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/edit-product" component={EditProduct} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
