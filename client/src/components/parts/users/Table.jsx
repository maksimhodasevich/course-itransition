import React from "react";

class Table extends React.Component {
  render() {
    const { users, _id } = this.props;
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">/</th>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">admin</th>
            <th scope="col">blocked</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>
                {!(_id === user._id) ? (
                  <input
                    type="checkbox"
                    value={user._id}
                    onChange={this.props.handleCheckboxChange}
                  />
                ) : (
                  ""
                )}
              </td>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? "true" : "false"}</td>
              <td>{user.blocked ? "true" : "false"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;