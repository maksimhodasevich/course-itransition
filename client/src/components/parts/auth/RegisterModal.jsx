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
  Alert,
  ModalFooter
} from "reactstrap";

import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nastedModal: false,
      name: "",
      email: "",
      password: "",
      message: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error, isAuth } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
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
    const { name, email, password } = this.state;
    const newUser = {
      name: name,
      email: email,
      password: password
    };
    this.props.register(newUser);
    this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">Register</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.message 
              ? <Alert color="danger">{this.state.message}</Alert>
              : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>name</Label>
                <Input type="text" name="name" placeholder="name"
                       onChange={this.onChange} className="mb-3" required/>
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="email"
                       className="mb-3" onChange={this.onChange} required/>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="password"
                       className="mb-3" onChange={this.onChange} required/>
                <Button block>Register</Button>
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
  error: state.error,
  wholeState: state
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);