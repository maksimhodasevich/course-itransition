import React from "react";
import { connect } from "react-redux";

import UsersTable from "../parts/UsersTable";
import CreateFanfik from '../parts/CreateFanfik';
import UserFanfiks from '../parts/UserFanfiks';


import store from "../../store";
import { loadUser } from "../../actions/authActions";

class Profile extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    const { isAuth, user } = this.props;
    const profileInfo = (
      <>
        <div className="profileInfo">
          <h4>User info: </h4>
          <p>
            <span>ID</span>: {user ? `${user._id}` : ""}
          </p>
          <p>
            <span>name</span>: {user ? `${user.name}` : ""}
          </p>
          <p>
            <span>email</span>: {user ? `${user.email}` : ""}
          </p>
          <p>
            <span>admin</span> : {user ? `${user.admin}` : ""}
          </p>
        </div>
      </>
    );
    return (
      <>
        <section className="profile">
          {isAuth ? profileInfo : ""}
          {user ? user.admin ? <UsersTable /> : "" : ""}

          <div className="fanfiksSection">
            <CreateFanfik />
            <UserFanfiks />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  entireState: state,
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile);
