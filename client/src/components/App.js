import React from "react";
import AppNavbar from "./parts/AppNavbar";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import store from "../store";
import { loadUser } from "../actions/authActions";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Error from "./pages/Error";

import "./../index.css";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { isAuth } = this.props.auth;
    return (
      <div className="App">
        <AppNavbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            {isAuth ? <Route exact path="/profile" component={Profile} /> : ""}
            <Route path="*" component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(App);
