import React from "react";
import { connect } from "react-redux";
import FanfiksList from "../parts/fanfik/FanfiksList";
import { loadUser } from "../../actions/authActions";
import { getFanfik } from "../../actions/fanfikAction";

class Search extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getFanfik();
  }
  render() {
    return (
      <div className="search-page">
        <h3>Пока выводится тоже самое что и на главной</h3>
        <div className="search-line">
          <input type="text" placeholder="search request...." />
          <button>Search</button>
        </div>
        <FanfiksList show={"all"} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps, { getFanfik, loadUser })(Search);