import React from "react";
import { connect } from "react-redux";
import { createFanfik, getFanfik } from "../../actions/fanfikAction";

class CreateFanfik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isOpen: false,
      className: "createFanfikHide",
      userIDforFanfik: "",
      fanfikName: "",
      description: "",
      gener: "fantasy",
      tags: []
    };
    this.handleDisplaying = this.handleDisplaying.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    this.props.getFanfik();
    this.setState({userIDforFanfik: this.props.isAuth.user._id})
  }

  handleDisplaying() {
    this.setState({ isOpen: !this.state.isOpen });
    this.state.isOpen
      ? this.setState({ className: "createFanfikHide" })
      : this.setState({ className: "createFanfikShow" });
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeCheckbox = e => {
    const tagsArray = this.state.tags;
    if (tagsArray.indexOf(e.target.value) >= 0) {
      tagsArray.pop(e.target.value);
    } else {
      tagsArray.push(e.target.value);
    }
    this.setState({ tags: tagsArray });
  };
  createFanfik = e => {
    e.preventDefault();
    const newFanfik = {
      userID: this.state.userIDforFanfik,
      fanfikName: this.state.fanfikName,
      description: this.state.description,
      gener: this.state.gener,
      tags: this.state.tags
    };
    this.props.createFanfik(newFanfik);
    this.handleDisplaying();
  };

  render() {
    const createFanfikFromSomeone = (
      <div className="form-group">
        <label>Creator of fanfik(default = you)</label>
        <br />
        <small>
          If you wanna create fanfik on behalf of another user enter his ID from
          users table
        </small>
        <input
          onChange={this.onChangeInput}
          name="userIDforFanfik"
          type="text"
          className="form-control"
          defaultValue={this.state.userIDforFanfik}
        />
      </div>
    );
    return (
      <>
        <h1>Fanfiks</h1>
        <button className="createwFanfik" onClick={this.handleDisplaying}>
          Create fanfik
        </button>
        <div className={this.state.className}>
          <form onSubmit={this.createFanfik}>
            {this.props.isAuth.user.admin ? createFanfikFromSomeone : ''}
            <div className="form-group">
              <label>Fanfik name</label>
              <input
                onChange={this.onChangeInput}
                name="fanfikName"
                type="text"
                className="form-control"
                placeholder="The story about ..."
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                onChange={this.onChangeInput}
                name="description"
                type="text"
                className="form-control"
                placeholder="Description"
                required
              />
            </div>
            <div className="form-group">
              <label>Ganer</label>
              <select
                onChange={this.onChangeInput}
                name="gener"
                id="gener"
                value={this.state.selectValue}
              >
                <option value="fantasy">Fantasy</option>
                <option value="erotic">Erotic</option>
                <option value="novel">Novel</option>
                <option value="none-of-available">None of these</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tags</label>
              <br />
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                value="astrology"
              />
              <span>#Anthology</span>
              <br />
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                value="classic"
              />
              <span>#Classic</span>
              <br />
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                value="drama"
              />
              <span>#Drama</span>
              <br />
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                value="fable"
              />
              <span>#Fable</span>
              <br />
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                value="tale"
              />
              <span>#Fairy Tale</span>
              <br />
            </div>
            <button className="btn btn-primary">Create Fanfik</button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth,
  fanfiks: state.fanfik.fanfik
});

export default connect(mapStateToProps, { createFanfik, getFanfik })(
  CreateFanfik
);
