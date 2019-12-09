import React from "react";

class Home extends React.Component {
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
          <div className="card col-3">
            <img
              src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Book title</h5>
              <p className="card-text">
                Some quick example text to build on the Book title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img
              src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Book title</h5>
              <p className="card-text">
                Some quick example text to build on the Book title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img
              src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Book title</h5>
              <p className="card-text">
                Some quick example text to build on the Book title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
