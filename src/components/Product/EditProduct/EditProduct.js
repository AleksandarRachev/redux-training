import React, { Component } from "react";
import Success from "../../Alerts/Success";
import Error from "../../Alerts/Error";
import {
  editProduct,
  clearMessages,
} from "../../../actions/Product/product.actions";
import { connect } from "react-redux";

class EditProduct extends Component {
  state = {
    id: null,
    title: null,
    price: null,
    description: null,
  };

  componentDidMount() {
    const product = this.props.location.state.product;
    this.setState({
      id: product.id,
      title: product.title,
      price: product.price / 100,
      description: product.description,
    });
  }

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
    this.props.clearMessages();
    this.props.editProduct({
      id: this.state.id,
      title: this.state.title,
      price: this.state.price * 100,
      description: this.state.description,
    });
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
            value={this.state.title}
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
            value={this.state.price}
            onChange={(e) => this.handlePriceChange(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            placeholder="Description"
            className="form-control"
            id="description"
            value={this.state.description}
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
    editProduct,
    clearMessages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(EditProduct);
