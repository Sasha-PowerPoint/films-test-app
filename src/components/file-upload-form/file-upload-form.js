import React, { Component } from 'react';
import './file-upload-form.css';
import { uploadFile, setListLoading, getFilmsList, hideUploadForm } from '../../action-creators/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (formData) => dispatch(uploadFile(formData)),
  setListLoading: () => dispatch(setListLoading()),
  getFilmsList: () => dispatch(getFilmsList()),
  hideUploadForm: () => dispatch(hideUploadForm()),
});

class FileUploadfForm extends Component {
  hideForm = () => {
    this.props.hideUploadForm();
  };

  FormUploadSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('file', this.file_input.files[0]);
    this.props.uploadFile(data);
    this.props.hideUploadForm();
    this.props.setListLoading();

    console.log("uploaded");
    console.log(this.file_input.files[0]);
  }

  render() {
    return (
      <div className="form-group">
        <form className="form" action="http://localhost:8080/upload"
          encType="multipart/form-data" method="post"
          onSubmit={this.FormUploadSubmit}>
          <button type="button" class="close close-add-film" data-dismiss="alert"
            onClick={this.hideForm}>&times;</button>
          <label>Upload file with films to manage it with your app</label>
          <input type="file" ref={(node) => this.file_input = node} required class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" name="upload" />
          <small id="fileHelp" class="form-text text-muted">This field can help you to convert your file to our storage, so you can browse your favourite films anytime. Load only '.txt' files</small>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadfForm);