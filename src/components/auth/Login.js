import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import { Fragment } from "react";
import "./login.css";

class Login extends Component {
  state = { email: "", password: "", errorMessage: "" };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password, errorMessage } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => this.setState({ errorMessage: err.message }));
  };
  render() {
    const { email, password, errorMessage } = this.state;
    const styles = {
      display: "none"
    };
    return (
      <Fragment>
        <section id="LoginBlock">
          <div className="col-md-4 mx-auto card my-4">
            <div className="card-body">
              <h1 className="h1 font-weight-bold text-center text-uppercase">
                Login
              </h1>

              {errorMessage.length > 0 ? (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {errorMessage}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : (
                <h1 style={{ display: "none" }}>hello</h1>
              )}

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <button className="btn btn-success btn-block my-4">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
