import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";
// import axios from "axios";
// import { Image } from "cloudinary-react";

// const Standard = () => {
//   const getUploadParams = () => {
//     return { url: "https://httpbin.org/post" };
//   };

//   // const handleChangeStatus = ({ meta }, status) => {
//   //   console.log(status, meta)
//   // }

//   const handleSubmit = files => {
//     const uploads = files.map(image => {
//       // our formdata
//       const formData = new FormData();
//       formData.append("file", image);
//       // formData.append("tags", '{TAGS}'); // Add tags for the images - {Array}
//       // formData.append("upload_preset", "{YOUR_PRESET}"); // Replace the preset name with your own
//       formData.append("api_key", "585866211186536"); // Replace API key with your own Cloudinary API key
//       formData.append("timestamp", (Date.now() / 1000) | 0);

//       // Replace cloudinary upload URL with yours
//       return axios
//         .post(
//           "https://api.cloudinary.com/v1_1/dntmre4o4/image/upload",
//           formData,
//           { headers: { "X-Requested-With": "XMLHttpRequest" } }
//         )
//         .then(response => console.log(response.data));
//     });
//     // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
//     axios.all(uploads).then(() => {
//       // ... do anything after successful upload. You can setState() or save the data
//       console.log("Images have all being uploaded");
//     });
//   };

//   return (
//     <Dropzone
//       getUploadParams={getUploadParams}
//       // onChangeStatus={handleChangeStatus}
//       onSubmit={handleSubmit}
//       styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
//     />
//   );
// };

// class Cloud extends React.Component {
//   render() {
//     return (
//       <div>
//         <Image cloudName="dntmre4o4" publicId="585866211186536" width="300" crop="scale" />
//         {/* // Or for more advanced usage: // import{" "} */}
//         {/* {(CloudinaryContext, Transformation)} from 'cloudinary-react';
//         <CloudinaryContext cloudName="dntmre4o4">
//           <Image publicId="585866211186536">
//             <Transformation width="200" crop="scale" angle="10" />
//           </Image>
//         </CloudinaryContext> */}
//       </div>
//     );
//   }
// }

class ChapterInput extends React.Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt();
  }

  render() {
    const { onChangeInput, handleEditorChange } = this.props;
    return (
      <div className="chapterSection">
        <label>Chapter name</label>
        <input type="text" name="chapterName" onChange={onChangeInput} />

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