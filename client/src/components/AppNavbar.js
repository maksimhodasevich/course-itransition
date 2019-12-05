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
import RegisterModel from "./auth/RegisterModel";
import Logout from "./auth/Logout";

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
    return (
      <div>
        <Navbar color="dark" dark light expand="md">
          <Container>
            <NavbarBrand href="/">Fanfiks</NavbarBrand>
            <NavbarToggler onClick={this.toggler} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/">home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/users-list">users list</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">search</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/profile">profile</NavLink>
                </NavItem>
                <NavItem>
                  <RegisterModel />
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
