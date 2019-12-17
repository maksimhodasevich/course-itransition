import React from "react";
import ReactHtmlParser from 'react-html-parser';

class ReadFanfikModal extends React.Component {
  render() {
    const { readContent } = this.props;
    // console.log(this.props.readContent);
    // console.log(readContent);
    return (
        <>
        <h1 className="fanfikTitle">{readContent.fanfikName}</h1>
        <h4 className="fanfikDescription">{readContent.description}</h4>
        <p className="fanfikOptional">Gener: {readContent.gener}</p>
        <p className="fanfikOptional">Tags: {readContent.tags.join(', ')}</p>
        <p className="fanfikOptional">Rating: {readContent.rating}</p>
        {readContent.chapters.map((item , i)=> {
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
        <h6>Comments</h6>
        {readContent.comments.map((item , i)=> {
          return (
            <div key={i} className="comment">
             <p>{item.username} : {item.comment}</p>
            </div>
          );
        })}
      </>
    );
  }
}

export default ReadFanfikModal;