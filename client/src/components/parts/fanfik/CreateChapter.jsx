import React from "react";
import ChapterInput from "./ChapterInput";

class CreateChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      chapterImages: []
    };
  }

  submitChapter = () => {
    const { chapterName, chapterMarkdown, chapterImages } = this.state;
    let count = chapterImages.length;
    const chapters = [
      ...this.state.chapters,
      { chapterName, chapterMarkdown, chapterImages, chapterImagesCount: count }
    ];
    this.setState({ chapters: chapters }, () => {
      this.props.createChapter(this.state.chapters);
    });
    this.setState({ chapterImages: [], chapterImagesCount: 0 });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditorChange = ({ html }) => {
    this.setState({ chapterMarkdown: html });
  };

  // getUploadParams = ({ file }) => {
  //   let chapterImagesArr = this.state.chapterImages;
  //   chapterImagesArr.push(file);
  //   this.setState({ chapterImages: chapterImagesArr });
  //   return { url: "https://httpbin.org/post" };
  // };

  chapters() {
    return this.state.chapters.map((chapter, i) => (
      <ChapterInput
        key={i + 1}
        onChangeInput={this.onChangeInput}
        handleEditorChange={this.handleEditorChange}
        getUploadParams={this.getUploadParams}
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
          getUploadParams={this.getUploadParams}
        />
        {this.chapters()}
        <input
          type="button"
          value="Submit chapter"
          onClick={this.submitChapter}
          className="submitChapter"
        />
      </div>
    );
  }
}

export default CreateChapter;