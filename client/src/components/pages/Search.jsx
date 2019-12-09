import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="searchPage">
        <div className="searchLine">
          <input type="text" placeholder="search request...." />
          <button>Search</button>
        </div>
        <div className="searchResults col-12">
          <div className="card col-3">
            <img src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Book title</h5>
              <p className="card-text">
                Some quick example text to build on the Book title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Book title</h5>
              <p className="card-text">
                Some quick example text to build on the Book title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png" className="card-img-top" alt="..." />
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

export default Search;
