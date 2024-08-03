import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      // I want to store the data in my localStorage
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const sellerLogin = createAsyncThunk(
  "auth/seller-login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      // I want to store the data in my localStorage
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const sellerRegister = createAsyncThunk(
  "auth/seller-register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // console.log(info);
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true,
      });
      // I want to store the data in my localStorage
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {
    messageClear: (state, payload) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message; //because we passed the message when login Success from the controller
      })
      .addCase(sellerRegister.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(sellerRegister.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(sellerRegister.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message; //because we passed the message when login Success from the controller
      })
      .addCase(sellerLogin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(sellerLogin.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(sellerLogin.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message; //because we passed the message when login Success from the controller
      });
  },
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
