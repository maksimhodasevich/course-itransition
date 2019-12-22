import React from "react";
import { connect } from "react-redux";

class ProfileInfo extends React.Component {
  render() {
    const { user } = this.props;
    let fanfiks = [];
    if(fanfiks) {
      fanfiks = this.props.fanfiks.filter(fanfik => fanfik.userID === user._id);
    }
    return (
      <div className="profile-info col-md-4">
        <h4>User info</h4>
        <p><span>ID</span>: {user ? `${user._id}` : ""}</p>
        <p><span>name</span>: {user ? `${user.name}` : ""}</p>
        <p><span>email</span>: {user ? `${user.email}` : ""}</p>
        <p><span>admin</span> : {user ? `${user.admin}` : ""}</p>
        <div className="medals">
          <h4>Medals</h4>
          <p>Create 1 fanfik: {fanfiks.length >= 1 ? "achived" : 'blocked'}</p>
          <p>Create 5 fanfik: {fanfiks.length >= 5 ? "achived" : 'blocked'}</p>
          <p>Create 10 fanfik: {fanfiks.length >= 10 ? "achived" : 'blocked'}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fanfiks: state.fanfik.fanfik
});

export default connect(mapStateToProps, null)(ProfileInfo);