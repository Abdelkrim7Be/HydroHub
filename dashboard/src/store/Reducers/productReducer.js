import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addProduct = createAsyncThunk(
  "product/addingProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/add-product", product, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProducts = createAsyncThunk(
  "product/gettingProducts",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `get-products?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    totalProducts: 0,
  },
  reducers: {
    messageClear: (state, payload) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.totalProducts = payload.totalProducts;
        state.products = payload.products;
      });
  },
});
export const { messageClear, successMessage, errorrMessage } =
  productReducer.actions;
export default productReducer.reducer;
