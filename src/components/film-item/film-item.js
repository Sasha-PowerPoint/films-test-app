import React, { Component } from 'react';
import "./film-item.css";
import { connect } from 'react-redux';
import { deleteFilm, setListLoading } from '../../action-creators/actions';

const mapDispatchToProps = (dispatch) => ({
  deleteFilm: (id) => dispatch(deleteFilm(id)),
  setListLoading: () => dispatch(setListLoading())
})

class FilmItem extends Component {


  onCross = () => {
    const { el, deleteFilm, setListLoading } = this.props;
    console.log(el.id);
    setListLoading();
    deleteFilm(el.id);
    console.log(window.location.href);
    console.log(window.location.hostname);
    console.log(window.location.protocol);
  }

  render() {
    const { el, deleteFilm } = this.props;

    return (
      <div className="card text-white bg-primary mb-3 film-item">
        
        <div className="card-header">
          <button type="button" class="close close-film-item" data-dismiss="alert"
            onClick={this.onCross}>&times;</button></div>
        <div className="card-body">
          <h4 className="card-title">{el.title}, {el.release_year}</h4>
          <div className="">Format:</div>
          <div className="badge badge-warning">{el.format}</div>
          <div className="">Actors:</div>
          <div className="stars-wrapper">{el.stars.map((el, id) => <span className="badge badge-info stars" key={id}>{el}</span>)}</div>
        </div>
      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(FilmItem);
