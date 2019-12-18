import React from "react";
import { connect } from "react-redux";

import UsersTable from "../parts/UsersTable";
import ProfileInfo from '../parts/ProfileInfo';
import CreateFanfik from "../parts/fanfik/CreateFanfik";

import FanfiksList from "../parts/fanfik/FanfiksList";

import { loadUser } from "../../actions/authActions";
import { getFanfik } from "../../actions/fanfikAction";

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
          <div className="col-md-5 col-sm-12">
            {isAuth ? <ProfileInfo user={user} /> : ""}
            <CreateFanfik />
          </div>
          {user ? user.admin ? <UsersTable /> : "" : ""}
        </div>
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