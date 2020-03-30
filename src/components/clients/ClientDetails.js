import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";
import ClientContent from "./clientContent";

class ClientDetails extends Component {
  state = {};
  OnDeleteMethod = () => {
    let { client, firestore, history } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <Fragment>
          <h2 className="h1 text-uppercase text-success font-weight-bold">
            Client Details
          </h2>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="float-left btn btn-outline-primary">
                <i className="fas fa-arrow-circle-left"> </i> Back to DashBoard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/client/edit/${client.id}`}
                  className="btn btn-outline-dark"
                >
                  <i className="fas fa-edit"></i> Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={this.OnDeleteMethod}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <section>
            <ClientContent client={this.props} />
          </section>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
ClientDetails.propTpyes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
