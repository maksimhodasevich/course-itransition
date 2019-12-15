import React from "react";
import { connect } from "react-redux";
import { createFanfik, getFanfik } from "../../../actions/fanfikAction";
import CreateChapter from "./CreateChapter";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  NavLink
} from "reactstrap";

class CreateFanfik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      modal: false,
      // className: "createFanfikHide",
      userName: "",
      creatorID: "",
      fanfikName: "",
      description: "",
      gener: "fantasy",
      tags: [],
      chapters: []
    };
  }

  componentDidMount() {
    this.props.getFanfik();
    setTimeout(() => {
      const { name, _id } = this.props.user;
      this.setState({ userName: name });
      this.setState({ creatorID: _id });
    }, 100);
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreatorName = e => {
    this.onChangeInput(e);
    const user = this.props.users.filter(user => user._id === e.target.value);
    if (user[0]) {
      this.setState({ userName: user[0].name });
    }
  };

  onChangeCheckbox = e => {
    const tagsArray = this.state.tags;
    if (tagsArray.indexOf(e.target.value) >= 0) {
      tagsArray.pop(e.target.value);
    } else {
      tagsArray.push(e.target.value);
    }
    this.setState({ tags: tagsArray });
  };

  createFanfik = e => {
    e.preventDefault();
    const { userName, creatorID, fanfikName, description, gener, tags, chapters } = this.state;
    const newFanfik = {
      userName,
      userID: creatorID,
      fanfikName,
      description,
      gener,
      tags,
      chapters
    };
    this.props.createFanfik(newFanfik, chapters);
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  createChapter = chapters => {
    this.setState({chapters: chapters});
  }

  render() {
    const { user } = this.props;
    const { creatorID, modal } = this.state;

    const createFanfikFromSomeone = (
      <>
        <Label>Creator of fanfik(default = you)</Label> <br />
        <small>If you wanna create fanfik on behalf of another user enter his ID from users table</small>
        <Input onChange={this.handleCreatorName} name="creatorID" type="text" defaultValue={creatorID} />
      </>
    );
    return (
      <>
        <h1>Fanfiks</h1>
        <div>
          <NavLink onClick={this.toggle} href="#">
            <Button>Create fanfik</Button>
          </NavLink>
          <Modal isOpen={modal} toggle={this.toggle} className="creatFanfikModal">
            <ModalHeader toggle={this.toggle}>Create fanfik</ModalHeader>
            <ModalBody>
              {user.admin ? createFanfikFromSomeone : ""}
              <Form onSubmit={this.createFanfik}>
                <FormGroup>
                  <Label>Fanfik name</Label>
                  <Input name="fanfikName" onChange={this.onChangeInput} required />
                  <Label>Description</Label>
                  <Input name="description" onChange={this.onChangeInput} required />
                  <Label>Ganer</Label>
                  <Input name="gener" type="select" onChange={this.onChangeInput}>
                    <option value="fantasy">Fantasy</option>
                    <option value="erotic">Erotic</option>
                    <option value="novel">Novel</option>
                    <option value="none-of-available">None of these</option>
                  </Input>
                  <Label className="checkboxesTags" onChange={this.onChangeCheckbox}>
                    Tags <br />
                    <Input type="checkbox" value="anthology" /> #Anthology <br />
                    <Input type="checkbox" value="classic" /> #Classic <br />
                    <Input type="checkbox" value="drama" /> #Drama <br />
                    <Input type="checkbox" value="fable" /> #Fable <br />
                    <Input type="checkbox" value="fairy-tale" /> #Fairy Tale <br />
                  </Label>
                  <CreateChapter createChapter = {this.createChapter} />
                  <Button block>Create fanfik</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  users: state.user.users
});

export default connect(mapStateToProps, { createFanfik, getFanfik })(CreateFanfik);