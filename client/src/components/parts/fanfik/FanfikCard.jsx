import React from "react";
import { deleteFanfik, getFanfik } from '../../../actions/fanfikAction';
import { connect } from "react-redux";
import StarRatings from 'react-star-ratings';
import { clearErrors } from '../../../actions/errorActions';

class FanfikCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      message: null
    }
  }

  componentDidMount() {
    this.rating();
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.rating();
    }
  }

  deleteFanfik = (e) => {
    this.props.deleteFanfik(e.target.value);
    this.props.getFanfik();
  }

  changeRating = newRating => {
    this.props.changeRating(newRating, this.props.fanfik._id)
  }

  rating = () => {
    let users = 0;
    const ratingSum = this.props.fanfik.rating.reduce((rating, userRating) => {
      users++;
      return rating + userRating.rating;
    }, 0);
    let rating;
    if(ratingSum === 0) {
      rating = 0;
    } else {
      rating = ratingSum / users;
    }
    this.setState({ rating: parseFloat(rating.toFixed(1)) });
  }

  render() {
    const { fanfik, showControls, isAuth } = this.props;
    const userFanfikControls = (
      <>
        {/* <button className="btn btn-primary m-1">Edit</button> */}
        <button className="btn btn-primary m-1" value={fanfik._id} onClick={this.deleteFanfik}>Delete</button>
      </>
    );
    return (
      <div className="card col-12">
        <div className="card-body">
          <h5 className="card-title">Name: {fanfik.fanfikName}</h5>
          <p className="card-text">Discription: {fanfik.description}</p>
          <p>Author: {fanfik.userName}</p>
          <p>Gener: {fanfik.gener}</p>
          <p>Tags: {fanfik.tags.join(", ")}</p>
          <p>Creation date: {fanfik.createDate}</p>
          <p>Rating: {this.state.rating}</p>
          {isAuth.isAuth ? 
          <StarRatings
            rating={this.state.rating}
            changeRating={this.changeRating}
            starRatedColor="yellow"
            numberOfStars={5}
          /> : "" }
          <button className="btn btn-primary m-1" onClick={this.props.toggle} value={fanfik._id}>Read</button>
          {showControls[0] || showControls[1] ? userFanfikControls : ''}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error,
  isAuth: state.auth,
  fanfiks: state.fanfik.fanfik,
  readContent: state.fanfik
});

export default connect(mapStateToProps, { deleteFanfik, getFanfik, clearErrors })(FanfikCard);