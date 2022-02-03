import pkg from "@reduxjs/toolkit";
import { Service } from "../services";
const { createSlice } = pkg;

// Define initial state, slice name, and reducers
const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    loading: false,
    data: [],
    searchCharacter: [],
    comics: [],
    characterDetail: [],
    error: null,
  },
  reducers: {
    getCharacters(state, action) {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
      state.searchCharacter = action.payload;
    },
    getCharacterComics(state, action) {
      state.loading = false;
      state.error = false;
      state.comics = action.payload;
    },
    searchCharacter(state, action) {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getCharacterDetail(state, action) {
      state.loading = false;
      state.error = false;
      state.characterDetail = action.payload;
    },
    getLoading(state){
        state.loading = true;
    }
  },
});

// Export actions
export const {
  getCharacters,
  getLoading,
  getCharacterComics,
  getCharacterDetail,
  searchCharacter
} = charactersSlice.actions;

export const GetAllCharacters = () => async (dispatch) => {
  dispatch(getLoading())
  Service.Characters.GetAllCharacters(30).then(res => {
      if(res){
          dispatch(getCharacters(res.data.results))
      }
  })
};
export const SearchCharacter = (data) => async (dispatch) => {
  dispatch(getLoading())
  dispatch(searchCharacter(data))
};
export const GetCharacterComics = (id) => async (dispatch) => {
  dispatch(getLoading())
  Service.Characters.GetCharacterComics(id).then(res => {
      if(res){
          dispatch(getCharacterComics(res.data.results))
      }
  })
};
export const GetCharacterDetail = (id) => async (dispatch) => {
  dispatch(getLoading())
  Service.Characters.GetCharacterById(id).then(res => {
      if(res){
          dispatch(getCharacterDetail(res.data.results[0]))
      }
  })
};


// Set up simple selectors
const loading = (state) => state.characters.loading;
const data = (state) => state.characters.data;
const search = (state) => state.characters.searchCharacter;
const comics = (state) => state.characters.comics;
const characterDetail = (state) => state.characters.characterDetail;
const errorMessage = (state) => state.characters.error;

// Export as group for easier import in components
export const charactersSelector = {loading, data, errorMessage, comics, characterDetail, search };

// Export reducer by default for loading into configureStore
export default charactersSlice.reducer;
