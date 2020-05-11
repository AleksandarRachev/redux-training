import React, { Component } from "react";
import Success from "../../Alerts/Success";
import Error from "../../Alerts/Error";
import "./AddProduct.css";
import {
  addProduct,
  clearMessages,
} from "../../../actions/Product/product.actions";
import { connect } from "react-redux";

const initialState = {
  title: null,
  price: null,
  description: null,
};

class AddProduct extends Component {
  state = initialState;

  componentWillUnmount() {
    this.props.clearMessages();
  }

  handleTitleChange = (title) => {
    this.setState({ ...this.state, title });
  };

  handlePriceChange = (price) => {
    this.setState({ ...this.state, price });
  };

  handleDescriptionChange = (description) => {
    this.setState({ ...this.state, description });
  };

  handleSubmit = () => {
    this.props.addProduct({
      title: this.state.title,
      price: this.state.price * 100,
      description: this.state.description,
    });
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    this.setState(initialState);
  };

  render() {
    return (
      <div className="product-add">
        {(this.props.success && <Success message={this.props.success} />) ||
          (this.props.error && <Error message={this.props.error} />)}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Title"
            className="form-control"
            id="title"
            onChange={(e) => this.handleTitleChange(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 w-50">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            id="price"
            onChange={(e) => this.handlePriceChange(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            placeholder="Description"
            className="form-control"
            id="description"
            onChange={(e) => this.handleDescriptionChange(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => this.handleSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.productReducer.success,
    error: state.productReducer.error,
  };
};

const mapDispatchToProps = () => {
  return {
    addProduct,
    clearMessages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddProduct);
