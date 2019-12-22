import React from "react";
import { connect } from "react-redux";
import {
  getUsers,
  deleteUsers,
  modifyUsers
} from "../../../actions/userActions";

import Table from "./Table";

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isOpen: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleCheckboxChange = e => {
    const checked = this.state.checked;
    if (e.target.checked) {
      checked.push(e.target.value);
    } else {
      checked.pop(e.target.value);
    }
    this.setState({ checked: checked });
  };

  deleteUsers = () => {
    if (this.state.checked.length > 0) {
      this.props.deleteUsers(this.state.checked);
      this.props.getUsers();
    }
  };

  blockUsers = e => {
    if (this.state.checked.length > 0) {
      const value = e.target.value === "true" ? true : false;
      this.props.modifyUsers(value, this.state.checked, "blockUser");
    }
  };

  setAdmin = e => {
    if (this.state.checked.length > 0) {
      const value = e.target.value === "true" ? true : false;
      this.props.modifyUsers(value, this.state.checked, "setAdmin");
    }
  };

  render() {
    const { users } = this.props.users;
    const { _id } = this.props.isAuth.user;
    return (
      <div className="users-table">
        <h4>Users Table</h4>
        <div className={"table-with-users"}>
          <div className="table-controls">
            <button onClick={this.deleteUsers}>Delete</button>
            <button onClick={this.blockUsers} value={true}>
              Block user(s)
            </button>
            <button onClick={this.blockUsers} value={false}>
              Unblock user(s)
            </button>
            <button onClick={this.setAdmin} value={true}>
              Appoint admin
            </button>
            <button onClick={this.setAdmin} value={false}>
              Remove admin
            </button>
          </div>
          {users ? <Table users={users} _id={_id} handleCheckboxChange={this.handleCheckboxChange} /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user,
  isAuth: state.auth
});

export default connect(mapStateToProps, { getUsers, deleteUsers, modifyUsers })(
  UsersTable
);