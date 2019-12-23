import React from "react";
import { connect } from "react-redux";
import { getFanfik, getFanfikToRead, closeFanfik, getChapters, changeRating } from "../../../actions/fanfikAction";

import FanfikCard from "./FanfikCard";
import ReadFanfikModal from "./ReadFanfikModal";
import Sort from "./Sort";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class FanfiksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: null,
      filter: null,
      modal: false
    };
  }

  componentDidMount() {
    this.props.getChapters();
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

  handleSortInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sortFanfiksAlgh = (a, b, param, order) => {
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

  changeRating = (rating, bookID) => {
    this.props.changeRating(rating, bookID, this.props.isAuth.user._id);
  }

  sortFanfiksResult = (fanfiks) => {
    let query;
    this.props.searchQuery ? query = this.props.searchQuery.trim() : query = "⁂";
    return fanfiks.filter(fanfik => {
      let match;
      let dataToCompare;
      let chapterMatches = 0;
      let chapters = this.props.chapters.filter(chapter => chapter.bookID === fanfik._id);
      chapters.map(chapterOfBook => {
        const { name, text } = chapterOfBook;
        dataToCompare = `${name} ${text}`;
        match = dataToCompare.toLocaleLowerCase().match(query);
        if(match) {
          chapterMatches++;
        }
      })
      if(chapterMatches > 0) {
        return true
      }
      const { userName, fanfikName, description, gener, comments } = fanfik;
      dataToCompare = `${userName} ${fanfikName} ${description} ${gener} ${comments.text}`;
      match = dataToCompare.toLowerCase().match(query);
      return match;
    });
  }

  displayFanfiks = (sort, filter, fanfiks, isAuth) => {
    let sortedFanfiks = fanfiks;
    if (this.props.show === "all") {
      sortedFanfiks = fanfiks;
    } else if (this.props.show === "user"){
      sortedFanfiks = fanfiks.filter(fanfik => fanfik.userID === isAuth.user._id);
    } else if (this.props.show === "search") {
      sortedFanfiks = this.sortFanfiksResult(sortedFanfiks, fanfiks);
    };
    switch (sort) {
      case "new-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiksAlgh(a, b, "createDate", -1);
        });
        break;
      case "old-first":
        sortedFanfiks.sort((a, b) => {
          return this.sortFanfiksAlgh(a, b, "createDate", 1);
        });
        break;
      default:
        break;
    }
    sortedFanfiks = sortedFanfiks.filter(fanfik => {
      if(!filter) {
        return true;
      } else {
        return fanfik.gener === filter;
      }
    });
    return sortedFanfiks;
  }

  render() {
    const { modal, sort, filter } = this.state;
    const { isAuth, readContent } = this.props;
    const fanfiks = this.props.fanfiks.sort((a, b) => {
      return this.sortFanfiksAlgh(a, b, "createDate", -1);
    });
    const modalMarkdown = readContent.readFanfikInfo;
    const sortedFanfiks = this.displayFanfiks(sort, filter, fanfiks, isAuth);
    const userFanfiks = sortedFanfiks.map((fanfik, index) => (
      <div key={index} className="fanfik-сard col-md-3 col-sm-12">
        {isAuth.user
          ?  <FanfikCard
              changeRating={this.changeRating}
              fanfik={fanfik}
              toggle={this.toggle}
              showControls={ [fanfik.userID === isAuth.user._id, isAuth.user.admin ]}
            />
          : <FanfikCard
              changeRating={this.changeRating}
              fanfik={fanfik}
              toggle={this.toggle}
              showControls={[false]}
            />
        }
      </div>
    ));
    return (
      <div className="col-12">
        <Sort sort={this.handleSortInput} />
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
  readContent: state.fanfik,
  chapters: state.fanfik.chapters
});

export default connect(mapStateToProps, {
  getFanfik,
  getFanfikToRead,
  closeFanfik,
  getChapters,
  changeRating
})(FanfiksList);