import React from "react";

class Sort extends React.Component {
  render() {
    return (
      <div className="sort col-12">
        <span>Sort</span>
        <select name="sort" onChange={this.props.sort}>
          <option value=""></option>
          <option value="new-first">New first</option>
          <option value="old-first">Old first</option>
          {/* <option value="popular-first">High rate first</option>
          <option value="no-popular-first">Low rate first</option> */}
        </select>
        <span>Filter by gener</span>
        <select name="filter" onChange={this.props.sort}>
          <option></option>
          <option value="fantasy">Fantasy</option>
          <option value="erotic">Erotic</option>
          <option value="novel">Novel</option>
          <option value="none-of-available">None of these</option>
        </select>
      </div>
    );
  }
}

export default Sort;