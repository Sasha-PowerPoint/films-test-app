import filmsAPI from '../services/filmsAPI';

export const filterByTitle = (inputted) => ({ type: "FILTER_BY_TITLE", payload: inputted });
export const filterByStar = (inputted) => ({ type: "FILTER_BY_STAR", payload: inputted });
export const getFilmsList = () => ({ type: "GET_FILMS", payload: filmsAPI.getFilms().then(json => json) });
export const deleteFilm = (id) => ({type: "DELETE_FILM", payload : filmsAPI.deleteFilm(id).then(json => json)});
export const setListLoading = () => ({type: "SET_LIST_LOADING"});
export const showUploadForm = () => ({type: "SHOW_UPLOAD_FORM"});
export const showAddForm = () => ({type: "SHOW_ADD_FORM"});
export const hideAddForm = () => ({type: "HIDE_ADD_FORM"});
export const hideUploadForm = () => ({type: "HIDE_UPLOAD_FORM"});
export const uploadFile = (formData) => ({type: "UPLOAD_FILE", payload: filmsAPI.uploadFile(formData).then(json => json)});
export const addFilm = (filmObj) => ({type: "ADD_FILM", payload: filmsAPI.addFilm(filmObj).then(json => json)});
export const banSubmitButton = () => ({type: "BAN_SUBMIT_BUTTON"});
export const allowSubmitButton = () => ({type: "ALLOW_SUBMIT_BUTTON"});
