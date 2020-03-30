import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
class AppNavBar extends Component {
  state = { isAuthenticated: false };
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  Logout = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <NavLink className="navbar-brand" to="#">
              ClientPanel
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                {isAuthenticated ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Dashboard
                    </NavLink>
                  </li>
                ) : null}
              </ul>

              <ul className="navbar-nav ml-auto">
                {isAuthenticated ? (
                  <Fragment>
                    {" "}
                    <li className="nav-item">
                      <a href="#!" className="nav-link">
                        <i className="fas fa-user"></i> {auth.email}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" onClick={this.Logout}>
                        Logout
                      </a>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/auth/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/auth/register">
                        Register
                      </NavLink>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavBar);
