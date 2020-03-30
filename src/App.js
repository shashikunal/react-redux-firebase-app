import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavBar from "./components/layouts/AppNavbar";
import Dashboard from "./components/layouts/Dashboard";
import "firebase/firestore";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import { createStore, combineReducers, compose } from "redux";
import "firebase/auth";

import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  reactReduxFirebase
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth.js";
import Register from "./components/auth/Register";
const firebaseConfig = {
  apiKey: "AIzaSyDSst5AOhqpebkhxw8iqhU_ZTrSXBo_UiM",
  authDomain: "reactfirebaseclientpanel-508ce.firebaseapp.com",
  databaseURL: "https://reactfirebaseclientpanel-508ce.firebaseio.com",
  projectId: "reactfirebaseclientpanel-508ce",
  storageBucket: "reactfirebaseclientpanel-508ce.appspot.com",
  messagingSenderId: "851689455205",
  appId: "1:851689455205:web:339b4dc23ed293c81e508c"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <Fragment>
              <AppNavBar />
              <div className="container mainBody">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}
                  ></Route>
                  <Route
                    exact
                    path="/client/add"
                    component={UserIsAuthenticated(AddClient)}
                  ></Route>
                  <Route
                    exact
                    path="/client/:id"
                    component={UserIsAuthenticated(ClientDetails)}
                  ></Route>
                  <Route
                    exact
                    path="/client/edit/:id"
                    component={UserIsAuthenticated(EditClient)}
                  ></Route>
                  <Route
                    exact
                    path="/auth/login"
                    component={UserIsNotAuthenticated(Login)}
                  ></Route>
                  <Route
                    exact
                    path="/auth/register"
                    component={UserIsNotAuthenticated(Register)}
                  ></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
