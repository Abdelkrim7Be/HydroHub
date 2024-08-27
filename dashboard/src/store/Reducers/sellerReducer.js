import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellerRequest = createAsyncThunk(
  "category/gettingSellerRequest",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `get-seller-request?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getSeller = createAsyncThunk(
  "category/gettingSeller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  "category/updatingSellerStatus",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-seller-status`, info, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  "seller/gettingActiveSellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_inactive_sellers = createAsyncThunk(
  "seller/gettingInactiveSellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-inactive-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

const sellerReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSellers: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state, payload) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerRequest.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSellers = payload.totalSellers;
      })
      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(updateSellerStatus.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSellers = payload.totalSellers;
      })
      .addCase(get_inactive_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSellers = payload.totalSellers;
      });
  },
});
export const { messageClear, successMessage, errorrMessage } =
  sellerReducer.actions;
export default sellerReducer.reducer;
