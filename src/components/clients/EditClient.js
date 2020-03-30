import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;
    const uploadClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };
    firestore
      .update({ collection: "clients", doc: client.id }, uploadClient)
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <Fragment>
          <div className="row mb-2 mt-4">
            <div className="col-md-6">
              <h1 className="h2 text-success text-uppercase font-weight-bold">
                Edit Client
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
                      ref={this.firstNameInput}
                      defaultValue={client.firstName}
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
                      ref={this.lastNameInput}
                      defaultValue={client.lastName}
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
                      ref={this.emailInput}
                      defaultValue={client.email}
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
                      ref={this.phoneInput}
                      defaultValue={client.phone}
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
                      ref={this.balanceInput}
                      defaultValue={client.balance}
                    />
                  </div>
                </div>
                {/* balance Block  */}
                <div className="col-12">
                  <button className="btn btn-success float-right">
                    <i class="fas fa-edit"></i> Update Client
                  </button>
                </div>
              </div>
            </form>
          </section>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
EditClient.propTpyes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
