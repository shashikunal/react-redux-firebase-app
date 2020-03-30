import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";

class Clients extends Component {
  state = { totalAmount: null };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalAmount: total };
    }
    return null;
  }
  render() {
    const { clients } = this.props;
    const { totalAmount } = this.state;

    if (clients) {
      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users"></i> Clients
              </h2>
            </div>
            <hr />
            <div className="col-md-6">
              <div className="float-right text-right card1 p-1">
                <span className="btn btn-outline-primary p-2">
                  Total Amount :{" "}
                  <strong>&#8377;{parseFloat(totalAmount).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>
          {/* row */}
          <table className="table table-bordered table-hover my-4">
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName + client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>&#8377;{parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-outline-success btn-block"
                    >
                      <i className="fas fa-arrow-circle-right"> </i> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
