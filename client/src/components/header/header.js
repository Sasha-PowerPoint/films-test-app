import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterByTitle, filterByStar, showUploadForm, showAddForm } from '../../action-creators/actions';
import FileUploadForm from '../file-upload-form';
import AddFilmForm from '../add-film-form';

const mapStateToProps = (state) => ({
  show_upload_form : state.show_upload_form,
  show_add_form : state.show_add_form
});

const mapDispatchToProps = (dispatch) =>({
  filterByTitle : (titleFilter) => dispatch(filterByTitle(titleFilter)),
  filterByStar : (starFilter) => dispatch(filterByStar(starFilter)),
  showUploadForm : () => dispatch(showUploadForm()),
  showAddForm : () => dispatch(showAddForm()),
});

class Header extends Component {

  SearchByTitle = (e) => {
    this.props.filterByTitle(e.target.value);
  };

  SearchByStar = (e) => {
    this.props.filterByStar(e.target.value);
  };

  UploadFilms = () => {
    this.props.showUploadForm();
  };

  AddFilm = () => {
    this.props.showAddForm();
  }

  render() {
    const {show_add_form, show_upload_form} = this.props;

    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand">FILMIFY</a>
        <input type="text" className="form-control" placeholder="Serch by title"
                onChange={this.SearchByTitle}></input>
        <input type="text" className="form-control" placeholder="Serch by actor"
                onChange={this.SearchByStar}></input>
        <i className="fas fa-file-upload"
            onClick={this.UploadFilms}></i>
        <i className="fas fa-plus-square"
            onClick={this.AddFilm}></i>
      </nav>
      {show_upload_form ?
        <FileUploadForm/> : null}
      {show_add_form ?
        <AddFilmForm/> : null}
      </>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
