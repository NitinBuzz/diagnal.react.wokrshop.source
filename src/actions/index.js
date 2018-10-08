import axios from "axios";

export const getMovies2 = movies => ({
  type: "GET_MOVIES",
  movies
});

export const getMoviesX = movies => ({
  type: "GET_MOVIES_X",
  movies
});

export const updateSearchKey = key => ({
  type: "UPDATE_SEARCH_KEY",
  key
});

export const filterMovies = key => ({
  type: "Filter_MOVIES",
  key
});

export const asyncFilterMovies = key => {
  return dispatch => {
    new Promise((resolve, reject) => {
      //dispatch(getMovies(1));
      resolve();
    }).then(() => {
      dispatch(filterMovies(key));
    });
  };
};

export const getMovies = (page, flush) => {
  return dispatch => {
    console.log(`getting async movies for page ${page} with flush ${flush}`);
    axios
      .get(`CONTENTLISTINGPAGE-PAGE${page}.json`)
      .then(res => {
        if (!flush) {
          dispatch(getMovies2(res.data.page["content-items"].content));
        } else {
          dispatch(getMoviesX(res.data.page["content-items"].content));
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  };
};
