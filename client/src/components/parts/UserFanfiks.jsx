import React from "react";
import { connect } from "react-redux";
import { getFanfik } from "../../actions/fanfikAction";

class UserFanfiks extends React.Component {
  fanfiks() {
    const allFanfiks = this.props.fanfiks.filter(fanfik => fanfik.userID === this.props.isAuth.user._id);   
    const userFanfiks = allFanfiks.map(fanfik => (
      <div className="card col-3" key={fanfik._id}>
        <div className="card-body">
          <h5 className="card-title">Name: {fanfik.fanfikName}</h5>
          <p className="card-text">Discription: {fanfik.description}</p>
          <p>Gener: {fanfik.gener}</p>
          <p>Tags: {fanfik.tags.join(', ')}</p>
          <p>Rating: {fanfik.rating}</p>
          <button className="btn btn-primary">Read</button>
        </div>
      </div>
    ));
    return <div className="userFanfiksList col-12">{userFanfiks}</div>;
  }

  render() {
    return (
      <>
        {this.props.fanfiks ? this.fanfiks() : ""}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth,
  fanfiks: state.fanfik.fanfik
});

export default connect(mapStateToProps, { getFanfik })(UserFanfiks);
