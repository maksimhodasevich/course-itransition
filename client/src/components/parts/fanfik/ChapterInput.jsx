import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from "react-dropzone-uploader";
// import axios from "axios";


class ChapterInput extends React.Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt();
  }

  // handleChangeStatus = ({ meta }, status) => {
  //   if(status === 'done') {
  //     console.log(meta)
  //   }
  // }

  // handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta))
  //   allFiles.forEach(f => f.remove())
  // }


  render() {
    const { onChangeInput, handleEditorChange } = this.props;
    return (
      <div className="chapterSection">
        <label>Chapter name</label>
        <input type="text" name="chapterName" onChange={onChangeInput} />
        <Dropzone
          getUploadParams={this.props.getUploadParams}
          onChangeStatus={this.props.handleImage}
          // onSubmit={this.props.handleImage}
        />


        <MdEditor
          value={""}
          renderHTML={text => this.mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
    );
  }
}

export default ChapterInput;