import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import './films-list.css';
import FilmItem from '../film-item';

const mapStateToProps = (state) => ({
    ...state
})


class FilmsList extends Component {

    

    passFilter = (el) => {
        if (this.props.titleFilter) {

        }
        return (this.props.titleFilter ?
            el.title.toLowerCase().indexOf(this.props.titleFilter.toLowerCase()) !== -1
            : true)
            &&
            (this.props.starFilter ?
                el.stars.some(
                    (star) => {
                        console.log(star.toLowerCase().indexOf(this.props.starFilter.toLowerCase()) !== -1);
                        return star.toLowerCase().indexOf(this.props.starFilter.toLowerCase()) !== -1
                    }
                )
                : true);
    }

    createList = () => {
        return this.props.films_list.map((el) =>
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
