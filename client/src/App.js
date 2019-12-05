import React from "react";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Home from "./components/Home";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import UsersList from "./components/UsersList";

import "./index.css";

class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/users-list" component={UsersList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={Login} />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
