import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groceries: {},
};

const groceriesSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    setGroceries(state, action) {
      state.groceries = action.payload;
    },
    loadGroceriesFromStorage(state, action) {
      const savedGroceries = action.payload;
      state.groceries = savedGroceries;
    },
  },
});

export const { setGroceries, loadGroceriesFromStorage } = groceriesSlice.actions;
export default groceriesSlice.reducer;
