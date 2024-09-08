import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
id: null,
name: '',
categories:[]
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/menu.json");
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productsFetch.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    }
});

export default productsSlice.reducer;
