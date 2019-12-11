import React from "react";
import { connect } from "react-redux";
import { getUsers, deleteUsers, modifyUsers } from "../../actions/userActions";

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isOpen: false,
      className: "tableUsersHide"
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

  deleteUsersList = () => {
    if (this.state.checked.length > 0) {
      this.props.deleteUsers(this.state.checked);
      this.props.getUsers();
    }
  };

  setAdmin = e => {
    if (this.state.checked.length > 0) {
      const value = e.target.value === "true" ? true : false;
      this.props.modifyUsers(value, this.state.checked);
      // this.props.getUsers();
      // this.forceUpdate();
    }
  };

  handleDisplaying = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.state.isOpen
      ? this.setState({ className: "tableUsersHide" })
      : this.setState({ className: "tableUsersShow" });
  };

  render() {
    const { users } = this.props.users;
    const table = (
      <div className={"tableWithUsers " + this.state.className}>
        <div className="tableControls">
          <button onClick={this.deleteUsersList}>Delete</button>
          <button onClick={this.setAdmin} value={true}>Appoint admin</button>
          <button onClick={this.setAdmin} value={false}>Remove admin</button>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">/</th>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    value={user._id}
                    onChange={this.handleCheckboxChange}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "true" : "false"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="usersTable">
        <h1>Users Table</h1>
        <button className="showHideUsertable" onClick={this.handleDisplaying}>
          Show Users
        </button>
        {users ? table : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user
});

export default connect(mapStateToProps, { getUsers, deleteUsers, modifyUsers })(UsersTable);
