export const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_TITLE":
      console.log(state);
      return { ...state, titleFilter: action.payload };
    case "FILTER_BY_STAR":
      console.log(state);
      return { ...state, starFilter: action.payload };
    case "GET_FILMS_FULFILLED":
      console.log(state);
      return { ...state, films_list: [...action.payload], list_loading: false };
    case "SHOW_UPLOAD_FORM":
      return { ...state, show_upload_form: true };
    case "HIDE_UPLOAD_FORM":
      return { ...state, show_upload_form: false };
    case "SET_LIST_LOADING":
      return { ...state, list_loading: true };
    case "HIDE_ADD_FORM":
      return { ...state, show_add_form: false };
    case "SHOW_ADD_FORM":
      return { ...state, show_add_form: true };
    case "UPLOAD_FILE_FULFILLED":
      if (!action.payload.err) {
        return { ...state, films_list: [...action.payload], list_loading: false };
      } else {
        return { ...state, films_list: { err: action.payload.err }, list_loading: false };
      };
    case "DELETE_FILM_FULFILLED":
      return { ...state, list_loading: false, films_list: [...action.payload] }
    case "ADD_FILM_FULFILLED":
      return { ...state, list_loading: false, films_list: [...action.payload] }


    default: return state;
  }
}