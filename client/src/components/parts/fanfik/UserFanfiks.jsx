import React from "react";
import { connect } from "react-redux";
import { getFanfik, getFanfikToRead, closeFanfik } from "../../../actions/fanfikAction";
import FanfikCard from './FanfikCard';
import ReadFanfikModal from './ReadFanfikModal';
import { getUsers } from "../../../actions/userActions";

import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

class UserFanfiks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidUpdate() {
    this.props.getFanfik();
  }

  toggle = (e) => {
    if(!this.state.modal) {
      this.props.getFanfikToRead(e.target.value);
    }
    this.setState({
      modal: !this.state.modal
    });
    if(this.state.modal) {
      this.props.closeFanfik();
    }
  }

  fanfiks() {
    const allFanfiks = this.props.fanfiks.filter(fanfik => fanfik.userID === this.props.isAuth.user._id);   
    const userFanfiks = allFanfiks.map((fanfik , index) => (
      <div key={index} className="fanfCard  col-3">

        <FanfikCard fanfik={fanfik} toggle={this.toggle} showControls={[true]} />
        </div>
    ));
    return (
      <>
        <div className="userFanfiksList col-12">{userFanfiks}</div>
      </>
    );
  }

  render() {
    const { readContent } = this.props;
    const content =  (
      <>
        {readContent
          ? 
          <ReadFanfikModal readContent={readContent} />
        : ''}
      </>
    );
    return (
      <>
        {this.props.fanfiks ? this.fanfiks() : ""}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="readFanfikModal">
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            {readContent ? content : ''}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth,
  fanfiks: state.fanfik.fanfik,
  readContent: state.fanfik.readFanfikInfo
});

export default connect(mapStateToProps, { getFanfik, getFanfikToRead, closeFanfik, getUsers })(UserFanfiks);
