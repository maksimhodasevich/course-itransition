import React from "react";
import { connect } from "react-redux";
import UsersTable from "../parts/UsersTable";

import store from "../../store";
import { loadUser } from "../../actions/authActions";

class Profile extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    const { isAuth, user } = this.props;
    const profileInfo = (
      <>
        <div className="profileInfo">
          <h4>User info: </h4>
          <p>
            <span>ID</span>: {user ? `${user._id}` : ""}
          </p>
          <p>
            <span>name</span>: {user ? `${user.name}` : ""}
          </p>
          <p>
            <span>email</span>: {user ? `${user.email}` : ""}
          </p>
          <p>
            <span>admin</span> : {user ? `${user.admin}` : ""}
          </p>
        </div>
      </>
    );
    return (
      <>
        <section className="profile">
          {isAuth ? profileInfo : ""}
          {user ? user.admin ? <UsersTable /> : "" : ""}

          <div className="fanfiksSection">
            <h1>Fanfiks</h1>
            <button className="createwFanfik">Create fanfik</button>

            <div className="userFanfiksList col-12">
              <div className="card col-3">
                <img
                  src="http://www.thesmallbig.com/css/img/thesmallbig-book-smaller.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Book title</h5>
                  <p className="card-text">
                    Some quick example text to build on the Book title and make
                    up the bulk of the card's content.
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
                    Some quick example text to build on the Book title and make
                    up the bulk of the card's content.
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
                    Some quick example text to build on the Book title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  entireState: state,
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile);
