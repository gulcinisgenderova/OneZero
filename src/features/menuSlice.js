import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asenkron veri çekme işlemi
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await fetch('http://localhost:5000/menu.json'); // JSON dosyasının yolu
  const data = await response.json();
  return data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menu = action.payload.menu; // `menu` JSON'dan gelen veriyi tutan key
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
