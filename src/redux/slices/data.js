import { getData, getUserHistory } from "@/services/dataServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  products: [],
  history: [],
};

export const fetchGetCommonData = createAsyncThunk("data/fetchGetCommonData", async () => {
  const response = await getData();
  return response;
});

export const fetchGetUserHistory = createAsyncThunk("data/fetchGetUserHistory", async () => {
  const response = await getUserHistory();
  return response;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetCommonData.fulfilled, (state, { payload }) => {
      const { success, brands, products } = payload;

      if (success) {
        state.brands = brands;
        state.products = products;
      }
    });
    builder.addCase(fetchGetUserHistory.fulfilled, (state, { payload }) => {
      const { success, receipts } = payload;

      if (success) {
        console.log(receipts);
      }
    });
  },
});

export const selectBrands = (state) => state.data.brands;
export const selectProducts = (state) => state.data.products;

export default dataSlice.reducer;
