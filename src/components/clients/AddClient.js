import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { firestore } from "firebase";
class AddClient extends Component {
  state = { firstName: "", lastName: "", email: "", phone: "", balance: "" };
  onFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    const newValue = this.state;
    const { firestore, history } = this.props;
    if (newValue.balance === "") {
      newValue.balance = 0;
    }
    firestore.add({ collection: "clients" }, newValue).then(() => {
      history.push("/");
    });
  };
  render() {
    return (
      <Fragment>
        <div className="row mb-2 mt-4">
          <div className="col-md-6">
            <h1 className="h2 text-success text-uppercase font-weight-bold">
              Add Client
            </h1>
          </div>
          <div className="col-md-6">
            <Link to="/" className="float-right btn btn-outline-primary">
              <i className="fas fa-arrow-circle-left"> </i> Back to DashBoard
            </Link>
          </div>
        </div>

        <hr className="my-2"></hr>
        <section className="formBlock my-4 bg-cover bg-white">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col-4 mb-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  FirstName
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onFormChange}
                    required
                  />
                </div>
              </div>
              {/* firstname Block  */}
              <div className="col-4 mb-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  lastName
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Enter Lastname"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onFormChange}
                    required
                  />
                </div>
              </div>
              {/* balance Block  */}
              <div className="col-4 mb-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Email
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onFormChange}
                    required
                  />
                </div>
              </div>
              <div className="col-4 mb-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  phone
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Enter Phonenumber"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onFormChange}
                    required
                  />
                </div>
              </div>
              {/* balance Block  */}
              {/* phone Block */}
              <div className="col-4 mb-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Amount
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-money-check-alt"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Enter amount"
                    name="balance"
                    value={this.state.balance}
                    onChange={this.onFormChange}
                    required
                  />
                </div>
              </div>
              {/* balance Block  */}
              <div className="col-12">
                <button className="btn btn-success float-right">
                  Add Client
                </button>
              </div>
            </div>
          </form>
        </section>
      </Fragment>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default firestoreConnect()(AddClient);
