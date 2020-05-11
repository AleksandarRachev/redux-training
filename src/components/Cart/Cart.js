import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";
import {
  incrementProductQuantity,
  decrementProductQuantity,
  countTotalProducts,
} from "../../actions/Cart/cart.actions";

class Cart extends Component {
  calcTotalPrice = () => {
    const total = this.props.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total / 100;
  };

  render() {
    if (this.props.isCartOpen) {
      return (
        <div className="cart">
          <ul>
            {this.props.cart &&
              this.props.cart.map((product) => {
                return (
                  <li key={product.id} className="list-group-item text-break">
                    <span className="p-2">
                      {product.quantity} x {product.title} $
                      {product.price / 100}
                    </span>
                    <div>
                      <button
                        onClick={() => this.handleDecrement(product)}
                        className="btn btn-outline-dark m-2 pt-0 pb-0 pr-2 pl-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() => this.handleIncrement(product)}
                        className="btn btn-outline-dark pt-0 pb-0 pr-2 pl-2"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
          <span>
            {this.props.cart.length > 0 && "Total: $" + this.calcTotalPrice()}
          </span>
          <br />
          <button
            className={
              this.props.cart.length > 0
                ? "btn btn-primary m-2"
                : "list-group-item disabled m-auto p-2"
            }
          >
            Make order
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  handleIncrement = (product) => {
    this.props.onIncrement(product);
    this.props.countTotalProducts();
  };

  handleDecrement = (product) => {
    this.props.onDecrement(product);
    this.props.countTotalProducts();
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    isCartOpen: state.cartReducer.showCart,
  };
};

const mapDispatchToProps = () => {
  return {
    countTotalProducts,
    onIncrement: incrementProductQuantity,
    onDecrement: decrementProductQuantity,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Cart);
