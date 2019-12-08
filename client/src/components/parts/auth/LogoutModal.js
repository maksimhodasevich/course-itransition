import React from "react";
import { connect } from "react-redux";
import { NavLink } from 'reactstrap';
import { logout } from "../../../actions/authActions";

class LogoutModal extends React.Component {
  render() {
    return (
        <>
            <NavLink onClick={this.props.logout} href="">
                Logout
            </NavLink>
        </>
    );
  }
}

export default connect(null, { logout })(LogoutModal);
