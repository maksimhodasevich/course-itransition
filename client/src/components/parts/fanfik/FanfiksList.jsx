import React from "react";
import { connect } from "react-redux";
import { getFanfik, getFanfikToRead, closeFanfik } from "../../../actions/fanfikAction";

import FanfikCard from "./FanfikCard";
import ReadFanfikModal from "./ReadFanfikModal";
import Sort from "./Sort";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

class FanfiksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: null,
      modal: false
    };
  }

  toggle = e => {
    if (!this.state.modal) {
      this.props.getFanfikToRead(e.target.value);
    }
    this.setState({ modal: !this.state.modal });
    if (this.state.modal) {
      this.props.closeFanfik();
    }
  };

  sortValue = e => {
    this.setState({ sortValue: e.target.value });
  };

  sortFanfiks = (a, b, param, order) => {
    let valueA = a[param];
    let valueB = b[param];
    if(param === "createDate") {
      valueA = Date.parse(a[param]);
      valueB = Date.parse(b[param]);
    }
    let comparison = 0;
    if (valueA > valueB) {
      comparison = order;
    } else if (valueA < valueB) {
      comparison = -1 * order;
    }
    return comparison;
  };

  render() {
    const { modal, sortValue } = this.state;
    const { isAuth, fanfiks, readContent } = this.props;
    let sortedFanfiks;
    if (this.props.show === "all") {
      sortedFanfiks = fanfiks;
    } else {
      sortedFanfiks = fanfiks.filter(fanfik => fanfik.userID === isAuth.user._id);
    }
    switch (sortValue) {
      case "new-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiks(a, b, "createDate", -1);
        });
        break;
      case "old-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiks(a, b, "createDate", 1);
        });
        break;
      case "popular-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiks(a, b, "rating", -1);
        });
        break;
      case "no-popular-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiks(a, b, "rating", 1);
        });
        break;
      default:
        break;
    }
    const userFanfiks = sortedFanfiks.map((fanfik, index) => (
      <div key={index} className="fanfik-сard col-md-3 col-sm-12">
        {isAuth.user
          ?  <FanfikCard
              fanfik={fanfik}
              toggle={this.toggle}
              showControls={ [fanfik.userID === isAuth.user._id, isAuth.user.admin ]}
            />
          : <FanfikCard
              fanfik={fanfik}
              toggle={this.toggle}
              showControls={[false]}
            />
        }
      </div>
    ));
    const modalMarkdown = readContent.readFanfikInfo;
    return (
      <div className="col-12">
        <Sort sortValue={this.sortValue} />
        <div className="fanfiks col-12">{userFanfiks}</div>
        <Modal isOpen={modal} toggle={this.toggle} className="read-fanfik-modal fanfik-modal">
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>{modalMarkdown ? <ReadFanfikModal readContent={modalMarkdown} /> : ""}</ModalBody>
        </Modal>
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
  closeFanfik
})(FanfiksList);
