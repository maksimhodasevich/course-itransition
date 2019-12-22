import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "../store";
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";

import AppNavbar from "./parts/AppNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ErrorP from "./pages/Error";
import "./../style/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light"
    };
  }
  
  componentWillMount() {
    store.dispatch(loadUser());
    if(sessionStorage.getItem("theme")) {
      this.setState({theme: sessionStorage.getItem("theme")});
    }
  }

  switchTheme = (value) => {
    this.setState({ theme: value }, () => {
      sessionStorage.setItem("theme", this.state.theme);
    });
  }

  render() {
    const { isAuth } = this.props.auth;
    return (
      <div className={"App " + this.state.theme}>
        <AppNavbar switchTheme={this.switchTheme} theme={this.state.theme} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            {isAuth ? <Route exact path="/profile" component={Profile} /> : ""}
            <Route path="*" component={ErrorP} />
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