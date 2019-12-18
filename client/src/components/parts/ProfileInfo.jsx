import React from "react";

class ProfileInfo extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile-info">
        <h4>User info</h4>
        <p><span>ID</span>: {user ? `${user._id}` : ""}</p>
        <p><span>name</span>: {user ? `${user.name}` : ""}</p>
        <p><span>email</span>: {user ? `${user.email}` : ""}</p>
        <p><span>admin</span> : {user ? `${user.admin}` : ""}</p>
      </div>
    );
  }
}

export default ProfileInfo;