import React from "react";
import ReactHtmlParser from "react-html-parser";

class ReadFanfikModal extends React.Component {
  render() {
    const { readContent } = this.props;
    return (
      <>
        <h1 className="fanfikTitle">{readContent.fanfikName}</h1>
        <h4 className="fanfikDescription">{readContent.description}</h4>
        <p className="fanfikOptional">Gener: {readContent.gener}</p>
        <p className="fanfikOptional">Tags: {readContent.tags.join(", ")}</p>
        {readContent.chapters.map((item, i) => {
          return (
            <div key={i} className="chapter">
              <h3>{item.name}</h3>
              { ReactHtmlParser(item.text) }
              <button className="likeButton" value={item._id}>&hearts;</button>
              <p className="likes">{item.likesFromID.length} likes on this chapter for now</p>
              <br />
          </div>
          );
        })}
        {/* <button onClick={this.jsPdfGenerator}>Downbload PDF</button> */}
        <div className="comments">
          <h4>Comments</h4>
          {readContent.comments.map((item, i) => {
            return (
              <div key={i} className="comment">
                <p>{item.username} : {item.text}</p>
              </div>
            );
          })}
          <div className="comment">
            <label>Leave your comment</label>
            <input type="text"/>
            <button>Send</button>
          </div>
        </div>
      </>
    );
  }
}

export default ReadFanfikModal;