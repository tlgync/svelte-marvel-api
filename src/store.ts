/* eslint-disable prefer-const */
import pkg from "@reduxjs/toolkit";

const { configureStore } = pkg

import charactersSlice from "./slices/charactersSlice";

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
  },
});

export default store;

export const useSelector = (select, onChange) => {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }


  store.subscribe(handleChange);
  handleChange();
  return currentState;
};