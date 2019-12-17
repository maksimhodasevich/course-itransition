import React from "react";
import { deleteFanfik } from '../../../actions/fanfikAction';
import { connect } from "react-redux";


class FanfikCard extends React.Component {

  deleteFanfik = (e) => {
    this.props.deleteFanfik(e.target.value)
  }

  render() {
    const { fanfik, showControls } = this.props;
    const userFanfikControls = (
      <>
        {/* <button className="btn btn-primary m-1">Edit</button> */}
        <button className="btn btn-primary m-1" value={fanfik._id} onClick={this.deleteFanfik}>Delete</button>
      </>
    );
    return (
      <div className="card" key={fanfik._id}>
        <div className="card-body">
          <h5 className="card-title">Name: {fanfik.fanfikName}</h5>
          <p className="card-text">Discription: {fanfik.description}</p>
          <p>Author: {fanfik.userName}</p>
          <p>Gener: {fanfik.gener}</p>
          <p>Tags: {fanfik.tags.join(", ")}</p>
          <p>Rating: {fanfik.rating}</p>
          <button className="btn btn-primary m-1" onClick={this.props.toggle} value={fanfik._id}>Read</button>
          {showControls[0] || showControls[1] ? userFanfikControls : ''}
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

export default connect(mapStateToProps, { deleteFanfik })(FanfikCard);