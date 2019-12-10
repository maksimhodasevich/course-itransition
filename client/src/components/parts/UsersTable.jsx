import React from "react";
import { connect } from "react-redux";
import { getUsers, deleteUsers } from "../../actions/userActions";

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isOpen: false,
      className: "tableUsersHide"
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.deleteUsersList = this.deleteUsersList.bind(this);
    this.handleDisplaying = this.handleDisplaying.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleCheckboxChange(e) {
    const checked = this.state.checked;
    let index;
    if (e.target.checked) {
      checked.push(e.target.value);
    } else {
      index = checked.indexOf(e.target.value);
      checked.splice(index, 1);
    }
    this.setState({ checked: checked });
  }

  deleteUsersList() {
    this.props.deleteUsers();
  }

  handleDisplaying() {
    this.setState({isOpen: !this.state.isOpen});
    this.state.isOpen ? this.setState({className: "tableUsersHide"}) : this.setState({className: "tableUsersShow"});
  }

  render() {
    const { users } = this.props.users;
    // console.log(localStorage.get  Item("token"));
    const table = (
      <div className={"tableWithUsers " + this.state.className}>
        <div className="tableControls">
          <button onClick={this.deleteUsersList}>Delete</button>
          <button>Appoint admin</button>
          <button>Remove admin</button>
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
        <button className="showHideUsertable" onClick={this.handleDisplaying}>Show Users</button>
        {users ? table : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user
});

export default connect(mapStateToProps, { getUsers, deleteUsers })(UsersTable);
