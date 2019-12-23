import React from "react";
import { connect } from "react-redux";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import LogoutModal from "./auth/LogoutModal";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      theme: this.props.theme
    };
  }

  toggler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  switchTheme = () => {
    if (this.state.theme === "light") {
      this.setState({ theme: "dark" }, () => {
        this.props.switchTheme(this.state.theme);
      });
    } else if (this.state.theme === "dark") {
        this.setState({ theme: "light" }, () => {
        this.props.switchTheme(this.state.theme);
      });
    }
  };

  render() {
    const { isAuth } = this.props.auth;
    const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    );
    let authLink = (
      <>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <LogoutModal />
        </NavItem>
      </>
    );
    return (
      <div>
        <Navbar expand="md">
          <Container>
            <label className="switch">
              <input type="checkbox" onClick={this.switchTheme} />
              <span className="slider"></span>
            </label>
            <NavbarBrand href="/">Fanfiks</NavbarBrand>
            <NavbarToggler onClick={this.toggler} className="mr-2" />

            {/* <NavbarToggler /> */}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
                {isAuth ? authLink : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);