import React, { Component } from 'react';
import FilmsList from '../films-list';
import Header from '../header';


class App extends Component {
    render() {
        return (
            <>
            <Header/>
            
            <FilmsList/>
            </>
        );
    }
}

export default App;