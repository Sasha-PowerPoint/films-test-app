import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import './films-list.css';
import FilmItem from '../film-item';

const mapStateToProps = (state) => ({
    titleFilter : state.titleFilter,
    starFilter : state.starFilter,
    films_list : state.films_list,
    list_loading : state.list_loading
})


class FilmsList extends Component {

    

    passFilter = (el) => {

        const {titleFilter, starFilter} = this.props;

        return (titleFilter ?
                el.title.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1
                : true)
            &&
                (starFilter ?
                el.stars.some(
                    (star) => {
                        return star.toLowerCase().indexOf(starFilter.toLowerCase()) !== -1
                    }
                )
                : true);
    }

    createList = () => {

        const {films_list} = this.props;

        return films_list.map((el) =>
            this.passFilter(el) ?
                <FilmItem key={el.id} el={el}/> :
                null
        );
    };

    render() {
        const {list_loading, films_list} = this.props;

        return (
            <div className="list-wrapper">
                {
                !list_loading 
                ? 
                    films_list.err
                    ?
                    <h3 className="text-danger">{films_list.err}</h3>
                    :
                        films_list.length === 0
                        ?
                        <h3 className="text-info">Your film list is empty</h3>
                        :
                        this.createList() 
                :
                <Spinner /> 
                }
            </div>
        );
    }
};

export default connect(mapStateToProps)(FilmsList);
