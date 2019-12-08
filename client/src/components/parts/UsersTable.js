import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";

class UsersTable extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.users;
    const table = (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
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
                <input type="checkbox" />
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
    );

    return (
      <div className="usersTable">
        <h1>Users Table</h1>
        {users ? table : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user
});

export default connect(mapStateToProps, { getUsers })(UsersTable);
