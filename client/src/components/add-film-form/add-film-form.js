import React, { Component } from 'react';
import { uploadFile, setListLoading, getFilmsList, hideAddForm, addFilm} from '../../action-creators/actions';
import { connect } from 'react-redux';
import './add-film-form.css';

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (formData) => dispatch(uploadFile(formData)),
  setListLoading: () => dispatch(setListLoading()),
  getFilmsList: () => dispatch(getFilmsList()),
  hideAddForm: () => dispatch(hideAddForm()),
  addFilm : (obj) => dispatch(addFilm(obj)),
});


class AddFilmForm extends Component {

  hideForm = () => {
    this.props.hideAddForm();
  }

  acceptAdding = () =>{
    const {title, release_year, format, stars} = this;
    const newFilm = {
      title : title.value,
      release_year : release_year.value,
      format : format.value,
      stars : stars.value.split(",")
    }
    this.props.addFilm(newFilm);
    this.props.setListLoading();
    this.props.hideAddForm();
  }

  render() {
    return (
      <div className="form-group">
        <div className="form">
          <button type="button" className="close close-add-film" data-dismiss="alert"
                  onClick={this.hideForm}>&times;</button>
          <h5>Title</h5>
          <input type="text" ref={(node) => this.title = node} className="form-control"/>
          <small className="form-text text-muted">Example: World War</small>
          <h5>Release Year</h5>
          <input type="text" ref={(node) => this.release_year = node} className="form-control"/>
          <small className="form-text text-muted">Example: 1935</small>
          <h5>Format</h5>
          <input type="text" ref={(node) => this.format = node} className="form-control"/>
          <small className="form-text text-muted">Example: DVD</small>
          <h5>Stars</h5>
          <textarea ref={(node) => this.stars = node} className="form-control"/>
          <small className="form-text text-muted">Example: Mike Foo, Joe Bar </small>
          <button type="submit" className="btn btn-info" onClick={this.acceptAdding}>Add</button>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(AddFilmForm);
