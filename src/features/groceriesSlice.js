import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "",
    items: [],
}
    

const groceriesSlice = createSlice({
    name: 'groceries',
    initialState,
});

//console.log(groceriesSlice);

export default groceriesSlice.reducer;