import React from "react";

class TagsCloud extends React.Component {
  render() {
    return (
        <div className="tagsCloud col-10 offset-1">
          <h4>Tags Cloud:</h4>
          <span className="tag">#Anthology</span>
          <span className="tag">#Classic</span>
          <span className="tag">#Drama</span>
          <span className="tag">#Fable</span>
          <span className="tag">#Fairy Tale</span>
        </div>
    );
  }
}

export default TagsCloud;