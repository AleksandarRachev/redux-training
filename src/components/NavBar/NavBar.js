import React, { Component } from "react";
import cart from "../../assets/images/cart.png";
import { Link } from "react-router-dom";
import { showCart, closeCart } from "../../actions/Cart/cart.actions";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <Link className="navbar-brand" to="/">
            App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/add-product">
                  Add product
                </Link>
              </li>
            </ul>
            <button
              onClick={() =>
                this.props.isCartOpen
                  ? this.props.closeCart()
                  : this.props.showCart()
              }
              className="btn btn-success m-1"
            >
              <img src={cart} width="30" height="30" alt="cart" />
              <span className="badge badge-light ml-2">
                {this.props.totalProducts}
              </span>
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    isCartOpen: state.cartReducer.showCart,
    totalProducts: state.cartReducer.totalProducts,
  };
};

const mapDispatchToProps = () => {
  return {
    showCart,
    closeCart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(NavBar);
