import React, { Component } from 'react';
import './file-upload-form.css';
import { uploadFile, setListLoading, getFilmsList, hideUploadForm, banSubmitButton, allowSubmitButton } from '../../action-creators/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  allow_submit_button : state.allow_submit_button
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (formData) => dispatch(uploadFile(formData)),
  setListLoading: () => dispatch(setListLoading()),
  getFilmsList: () => dispatch(getFilmsList()),
  hideUploadForm: () => dispatch(hideUploadForm()),
  banSubmitButton: () => dispatch(banSubmitButton()),
  allowSubmitButton: () => dispatch(allowSubmitButton()),
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

  handleFileType = (e) => {
    const {allowSubmitButton, banSubmitButton} = this.props;

    if(e.target.files[0].name.split(".")[1] === "txt"){
      allowSubmitButton();
    }else{
      banSubmitButton();
    };
  }

  handleSubmitClick = (e) =>{
    if(!this.props.allow_submit_button){
      e.preventDefault();
    }
  }

  render() {

    const {allow_submit_button} = this.props;

    return (
      <div className="form-group">
        <form className="form"
          onSubmit={this.FormUploadSubmit}>
          <button type="button" className="close close-add-film" data-dismiss="alert"
            onClick={this.hideForm}>&times;</button>
          <label>Upload file with films to manage it with your app</label>
          <input type="file" ref={(node) => this.file_input = node} 
                  required 
                  className="form-control-file" id="exampleInputFile"
                  aria-describedby="fileHelp" 
                  name="upload"
                  accept=".txt"
                  onChange={this.handleFileType} />
          <small id="fileHelp" class="form-text text-muted">This field can help you to convert your file to our storage, so you can browse your favourite films anytime. Load only '.txt' files</small>
          <input type="submit" 
                onClick={this.handleSubmitClick}
                className={`btn ${allow_submit_button === undefined || allow_submit_button ? "btn-info" : "btn-outline-danger"} upload_submit_button`}/> 
          <ErrMessage show={allow_submit_button}/>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadfForm);

const ErrMessage = ({show}) => {
  console.log(show);
  return show !== undefined && !show ?
            <small id="fileHelp" className="form-text text-danger">Wrong file type! Allowed type: .txt</small>:
        null
}