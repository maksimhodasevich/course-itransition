import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";
import { getFanfik } from "../../actions/fanfikAction";

import UsersTable from "../parts/users/UsersTable";
import ProfileInfo from "../parts/ProfileInfo";
import CreateFanfik from "../parts/fanfik/CreateFanfik";
import FanfiksList from "../parts/fanfik/FanfiksList";

class Profile extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getFanfik();
  }

  render() {
    const { isAuth, user } = this.props;
    return (
      <div className="profile-page">
        <div className="profile-top-row">
          {isAuth ? <ProfileInfo user={user} /> : ""}
          {user ? user.admin ? <UsersTable /> : "" : ""}
        </div>
        <CreateFanfik />
        <FanfiksList show={"user"} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps, { getFanfik, loadUser })(Profile);
