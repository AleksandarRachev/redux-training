import React, { Component } from "react";
import { connect } from "react-redux";
import Product from "../Product/Product";
import "./Catalogue.css";
import { getProducts } from "../../actions/Product/product.actions";

class Catalogue extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="catalogue">
        {this.props.products &&
          this.props.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products
  };
};

const mapDispatchToProps = () => {
  return {
    getProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Catalogue);
