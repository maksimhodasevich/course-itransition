import React from "react";
import ChapterInput from "./ChapterInput";

class CreateChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: []
    };
  }

  submitChapter = () => {
    const { chapterName, chapterMarkdown } = this.state;
    const chapters = [...this.state.chapters, { chapterName, chapterMarkdown }];
    this.setState({ chapters: chapters }, () => {
      this.props.createChapter(this.state.chapters);
    });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditorChange = ({ html }) => {
    this.setState({ chapterMarkdown: html });
  };

  chapters() {
    return this.state.chapters.map((chapter, i) => (
      <ChapterInput
        key={i + 1}
        onChangeInput={this.onChangeInput}
        handleEditorChange={this.handleEditorChange}
      />
    ));
  }

  render() {
    return (
      <div className="chapterCreator">
        <ChapterInput
          key={1}
          onChangeInput={this.onChangeInput}
          handleEditorChange={this.handleEditorChange}
        />
        {this.chapters()}
        <input
          type="button"
          value="Submit chapter"
          onClick={this.submitChapter}
        />
      </div>
    );
  }
}

export default CreateChapter;