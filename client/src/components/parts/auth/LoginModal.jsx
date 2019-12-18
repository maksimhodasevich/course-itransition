import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  NavLink,
  Alert
} from "reactstrap";

import { connect } from "react-redux";
import { login } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      message: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error, isAuth } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ message: error.message.msg });
      } else {
        this.setState({ message: null });
      }
    }
    if (this.state.modal) {
      if (isAuth) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">Login</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>{this.state.message 
            ? <Alert color="danger">{this.state.message}</Alert>
            : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="email"
                       onChange={this.onChange} className="mb-3"/>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="password"
                        onChange={this.onChange}  className="mb-3"/>
                <Button block>Login</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);