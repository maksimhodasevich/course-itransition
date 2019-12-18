import React from "react";

class Sort extends React.Component {
  render() {
    return (
      <div className="sort col-12">
        <span>Sort</span>
        <select name="sort" onChange={this.props.sortValue}>
          <option value=""></option>
          <option value="new-first">New first</option>
          <option value="old-first">Old first</option>
          <option value="popular-first">High rate first</option>
          <option value="no-popular-first">Low rate first</option>
        </select>
      </div>
    );
  }
}

export default Sort;