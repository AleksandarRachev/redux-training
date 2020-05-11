import React, { Component } from "react";
import Success from "../Alerts/Success";
import Error from "../Alerts/Error";
import {
  addProductToCart,
  countTotalProducts,
} from "../../actions/Cart/cart.actions";
import {
  deleteProduct,
  clearMessages,
} from "../../actions/Product/product.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Product extends Component {
  handleDelete = (product) => {
    const del = window.confirm(
      "Are you sure you want to delete " + product.title
    );
    if (del) {
      this.props.deleteProduct(product.id);
    }
  };

  render() {
    const { product } = this.props;

    return (
      <div className="card" style={{ width: "14rem", margin: "2rem" }}>
        {(this.props.success && <Success message={this.props.success} />) ||
          (this.props.error && <Error message={this.props.error} />)}
        <div style={{ display: "flex" }}>
          <Link
            to={{ pathname: "/edit-product", state: { product } }}
            className="btn btn-warning text-white mr-2 ml-2"
            style={{ width: "100%" }}
          >
            edit
          </Link>
          <button
            onClick={() => this.handleDelete(product)}
            className="btn btn-danger mr-2 ml-2"
          >
            delete
          </button>
        </div>
        <img
          src="data:image/jpeg;base64,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"
          className="card-img-top"
          width="auto"
          height="200px"
          alt="product"
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.price / 100}</p>
          <button
            onClick={() => this.handleAddToCart(product)}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }

  handleAddToCart = (product) => {
    this.props.addProductToCart(product);
    this.props.countTotalProducts();
  };
}

const mapDispatchToProps = () => {
  return {
    addProductToCart,
    countTotalProducts,
    deleteProduct,
    clearMessages,
  };
};

export default connect(null, mapDispatchToProps())(Product);
