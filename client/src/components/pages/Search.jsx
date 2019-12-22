import React from "react";
import { connect } from "react-redux";
import FanfiksList from "../parts/fanfik/FanfiksList";
import { loadUser } from "../../actions/authActions";
import { getFanfik } from "../../actions/fanfikAction";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null
    };
  }
  componentDidMount() {
    this.props.loadUser();
    this.props.getFanfik();
  }
  handleInput = (e) => {
    this.setState({searchQuery: e.target.value})
  }
  render() {
    return (
      <div className="search-page">
        <div className="search-line">
          <input type="text" onChange={this.handleInput} placeholder="search request...." />
        </div>
        <FanfiksList show={"search"} searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps, { getFanfik, loadUser })(Search);