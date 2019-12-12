import React from "react";

class CreateChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: []
    };
  }

  submitChapter = e => {
    const { chapterName, chapterText } = this.state;
    const chapters = [...this.state.chapters, { chapterName, chapterText }];
    this.setState({ chapters: chapters }, () => {
      this.props.createChapter(this.state.chapters);
    });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  chapters() {
    return this.state.chapters.map((chapter, i) => (
      <div key={i + 1} className="chapterSection">
        <label>Chapter name</label>
        <input type="text" name="chapterName" onChange={this.onChangeInput} />
        <textarea name="chapterText" onChange={this.onChangeInput}></textarea>
      </div>
    ));
  }

  render() {
    return (
      <div className="chapterCreator">
        <div key={1} className="chapterSection">
          <label>Chapter name</label>
          <input type="text" name="chapterName" onChange={this.onChangeInput} />
          <textarea name="chapterText" onChange={this.onChangeInput}></textarea>
        </div>
        {this.chapters()}
        <input type="button" value="Submit chapter" onClick={this.submitChapter}/>
      </div>
    );
  }
}

export default CreateChapter;