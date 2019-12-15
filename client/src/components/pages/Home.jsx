import React from "react";
import { connect } from "react-redux";
import { getFanfik } from "../../actions/fanfikAction";

class Home extends React.Component {
  componentDidMount() {
    this.props.getFanfik();
  }
  fanfiks() {
    const userFanfiks = this.props.fanfiks.map(fanfik => (
      <div className="card col-3" key={fanfik._id}>
        <div className="card-body">
          <h5 className="card-title">Name: {fanfik.fanfikName}</h5>
          <p className="card-text">Discription: {fanfik.description}</p>
          <p className="card-text">Author: {fanfik.userName}</p>
          <p>Gener: {fanfik.gener}</p>
          <p>Tags: {fanfik.tags.join(", ")}</p>
          <p>Rating: {fanfik.rating}</p>
          <button className="btn btn-primary">Read</button>
          <button className="btn btn-primary m-1">Edit</button>
          <button className="btn btn-primary m-1">Delete</button>
        </div>
      </div>
    ));
    return <div className="userFanfiksList col-12">{userFanfiks}</div>;
  }

  render() {
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
          {this.props.fanfiks ? this.fanfiks() : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fanfiks: state.fanfik.fanfik
});

export default connect(mapStateToProps, { getFanfik })(Home);
