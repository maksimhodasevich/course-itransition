import React from "react";
import { connect } from "react-redux";
import {
  getFanfik,
  getFanfikToRead,
  closeFanfik,
  deleteFanfik
} from "../../actions/fanfikAction";
import FanfikCard from "../parts/fanfik/FanfikCard";
import ReadFanfikModal from "../parts/fanfik/ReadFanfikModal";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

class Home extends React.Component {
  xw;
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidUpdate() {
    // setInterval(() => {
      this.props.getFanfik();
    // }, 1000);
  }

  toggle = e => {
    if (!this.state.modal) {
      this.props.getFanfikToRead(e.target.value);
    }
    this.setState({
      modal: !this.state.modal
    });
    if (this.state.modal) {
      this.props.closeFanfik();
    }
  };

  deleteFanfik = (e) => {
    this.props.deleteFanfik(e.target.value);
    this.props.getFanfik();
  }

  fanfiks(isAuth) {
    // let access = false;
    // if(isAuth.user) {
    //   access = isAuth.user.admin;  // админ или не админ авторищирован
    // }

    // console.log(access);

    // admin / id matches /
    // true  / true       /
    const userFanfiks = this.props.fanfiks.map((fanfik, index) => (
      <div key={index} className="fanfCard  col-3">
        {/* {access = fanfik.userID === isAuth.user._id} */}
        {/* <p>{`userID: ${access ? 'true' : 'false'}; creatorID: ${fanfik.userID}`}</p> */}
        {isAuth.user ? (
          <FanfikCard
            key={index}
            fanfik={fanfik}
            toggle={this.toggle}
            showControls={[
              fanfik.userID === isAuth.user._id,
              isAuth.user.admin
            ]}
          />
        ) : (
          <FanfikCard
            key={index}
            fanfik={fanfik}
            toggle={this.toggle}
            showControls={[false]}
          />
        )}
      </div>
    ));
    return (
      <>
        <div className="userFanfiksList col-12">{userFanfiks}</div>
      </>
    );
  }

  render() {
    const { readContent, isAuth } = this.props;
    const content = (
      <>
        {readContent.readFanfikInfo ? (
          <ReadFanfikModal readContent={readContent.readFanfikInfo} />
        ) : (
          ""
        )}
      </>
    );
    return (
      <div className="mainPage">
        <div className="tagsCloud">
          <h4>Tags Cloud:</h4>
          <span className="tag">#Anthology</span>
          <span className="tag">#Classic</span>
          <span className="tag">#Drama</span>
          <span className="tag">#Fable</span>
          <span className="tag">#Fairy Tale</span>
        </div>
        <div className="mainBooks">
          {this.props.fanfiks ? this.fanfiks(isAuth) : ""}
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="readFanfikModal"
          >
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody>{readContent ? content : ""}</ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth,
  fanfiks: state.fanfik.fanfik,
  readContent: state.fanfik
});

export default connect(mapStateToProps, {
  getFanfik,
  getFanfikToRead,
  closeFanfik,
  deleteFanfik
})(Home);
