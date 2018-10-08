import { combineReducers } from "redux";

const initalState = [];

const moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return [...state, ...action.movies];
    case "GET_MOVIES_X":
      return [...action.movies];
    case "Filter_MOVIES":
      if (action.key.trim().length < 1) {
        return [...state];
      }
      const regex = RegExp(`${action.key.toLowerCase()}`);
      let newState = state.filter(
        movie => regex.test(movie.name.toLowerCase())
        // movie.name.toString().toLowerCase() ===
        // action.key.toString().toLowerCase()
        //regex.test(movie.name.toLowerCase())
        //action.key.toLowerCase()
      );
      return [...newState];
    default:
      return state;
  }
};

const searchReducer = (state = { searchKey: "" }, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_KEY":
      return { ...state, ...{ searchKey: action.key } };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  search: searchReducer
});

export default rootReducer;
