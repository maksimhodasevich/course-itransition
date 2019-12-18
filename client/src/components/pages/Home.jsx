import React from "react";
import { connect } from "react-redux";
import { getFanfik } from "../../actions/fanfikAction";
import FanfiksList from "../parts/fanfik/FanfiksList";
import TagsCloud from "../parts/TagsCloud";

class Home extends React.Component {
  componentDidMount() {
    this.props.getFanfik();
  }

  render() {
    return (
      <div className="home-page">
        <TagsCloud />
        <FanfiksList show={"all"} />
      </div>
    );
  }
}

export default connect(null, { getFanfik })(Home);