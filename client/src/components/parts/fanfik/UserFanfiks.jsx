import React from "react";
import { connect } from "react-redux";
import { getFanfik, getFanfikToRead, closeFanfik } from "../../../actions/fanfikAction";
import ReactHtmlParser from 'react-html-parser';

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
    const userFanfiks = allFanfiks.map(fanfik => (
      <div className="card col-3" key={fanfik._id}>
        <div className="card-body">
          <h5 className="card-title">Name: {fanfik.fanfikName}</h5>
          <p className="card-text">Discription: {fanfik.description}</p>
          <p>Author: {fanfik.userName}</p>
          <p>Gener: {fanfik.gener}</p>
          <p>Tags: {fanfik.tags.join(', ')}</p>
          <p>Rating: {fanfik.rating}</p>
          <button className="btn btn-primary m-1" onClick={this.toggle} value={fanfik._id}>Read</button>
          <button className="btn btn-primary m-1">Edit</button>
          <button className="btn btn-primary m-1">Delete</button>
        </div>
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
          <>
          <h3>Name: {readContent.fanfikName}</h3>
          <h5>Description: {readContent.description}</h5>
          <h5>Gener: {readContent.gener}</h5>
          <h5>Tags: {readContent.tags.join(', ')}</h5>
          <h5>Rating: {readContent.rating}</h5>
          <br />
          {readContent.chapters.map((item , i)=> {
            return (
              <div key={i} className="chapter">
                <h5>{item.name}</h5>
                { ReactHtmlParser(item.text) }
                <br />
              </div>
            );
          })}
        </>
        : ''}
      </>
    );
    return (
      <>
        {this.props.fanfiks ? this.fanfiks() : ""}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="creatFanfikModal">
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

export default connect(mapStateToProps, { getFanfik, getFanfikToRead, closeFanfik })(UserFanfiks);
