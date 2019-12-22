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
import { register, registerSuccess } from "../../../actions/authActions";
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
    const { error, regSuccess } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ message: error.message.msg });
      } else {
        this.setState({ message: null });
      }
    }
    if (regSuccess) {
      if(!this.state.nastedModal && this.state.modal) {
        this.toggleNasted();
      }
    }
  }
  
  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleNasted = () => {
    this.props.registerSuccess();
    this.setState({
      nastedModal: !this.state.nastedModal
    });
    setTimeout(() => {
      this.toggleAll();
    }, 5000);
  };
  
  toggleAll = () => {
    this.setState({modal: !this.state.modal, nastedModal: !this.state.nastedModal});
  }
  
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
            <Modal isOpen={this.state.nastedModal} toggle={this.toggleNasted}>
              <ModalBody>
                <h1>Submit your registration with link on your email:)<br />Happy reading!</h1>
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  regSuccess: state.auth.regSuccess
});

export default connect(mapStateToProps, { register, clearErrors, registerSuccess })(RegisterModal);