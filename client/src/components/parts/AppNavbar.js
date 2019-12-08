import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import LogoutModal from "./auth/LogoutModal";
import { connect } from "react-redux";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggler = this.toggler.bind(this);
  }

  toggler() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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
        <Navbar color="dark" dark light expand="md">
          <Container>
            <NavbarBrand href="/">Fanfiks</NavbarBrand>
            <NavbarToggler onClick={this.toggler} />
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
