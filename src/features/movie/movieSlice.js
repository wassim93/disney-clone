import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  searchedMovie: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    getMovie: (state, action) => {
      //console.log("payyload", action.payload);
      const res = current(state).movies.find((m) => m.title === action.payload);
      state.searchedMovie = res;
      //console.log(res);
    },
  },
});

export const { setMovies, getMovie } = movieSlice.actions;
export const selectMovies = (state) => state.movie.movies;
export const selectSearchedMovie = (state) => state.movie.searchedMovie;
export default movieSlice.reducer;
