import React from "react";
import { Container, Button, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import axios from "axios";
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItems } from '../actions/userAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "1",
      username: "",
      password: "",
      email: "",
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.switchTabOne = this.switchTabOne.bind(this);
    this.switchTabTwo = this.switchTabTwo.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);


    this.redirect = this.redirect.bind(this);

  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleLogIn(e) {
    e.preventDefault();
    axios.post('/api/users', {
        username: this.state.username,
        password: this.state.password
    }).then(res => {
        if(res.data == null){
            alert("Wrong login or password")
        } else {
            alert("You are logged in as " + res.data.username);
            this.redirect();
        }
    })
  }

  handleSignUp(e) {
    e.preventDefault();
    axios.post('/api/users', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
    }).then(res => {
        if(res.data !== null){
            alert("User with such a username already exists. Try another one")
        } else {
            alert("You are registered. Please, login in");
            this.setState({tab: "1"});
        }
    })
  }

  switchTabOne() {
    this.setState({tab: "1"})
  }
  switchTabTwo() {
    this.setState({tab: "2"})
}

redirect() {
    let path = `/`;
    this.props.history.push(path);
  }

  render() {
    return (
      <Container className="login">
        <Nav tabs>
          <NavItem>
            <NavLink onClick={this.switchTabOne}>Login in</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.switchTabTwo}>Sign up</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.tab}>
          <TabPane tabId="1">
            <Form
              method="POST"
              onSubmit={this.handleLogIn}
              className="loginForm col-md-5 col-sm-12"
            >
              <h1 className="loginTitle">Log in</h1>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="kittycat67"
                  onChange={this.handleChangeUsername}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.handleChangePassword}
                  required
                />
              </FormGroup>
              <Button>Log in</Button>
            </Form>
          </TabPane>
          <TabPane tabId="2">
            <Form
              method="POST"
              onSubmit={this.handleSignUp}
              className="loginForm col-md-5 col-sm-12"
            >
              <h1 className="loginTitle">Sign up</h1>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="kittycaty67"
                  onChange={this.handleChangeUsername}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.handleChangePassword}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={this.handleChangeEmail}
                  required
                />
              </FormGroup>
              <Button>Sign up</Button>
            </Form>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

export default connect()(Login);
