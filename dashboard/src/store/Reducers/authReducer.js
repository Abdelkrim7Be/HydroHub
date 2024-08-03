import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

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
export const getUserInfo = createAsyncThunk(
  "auth/get-user-info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
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

export const getRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return;
  }
};

const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: getRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
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
        state.token = payload.token;
        state.role = getRole(payload.token);
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
        state.token = payload.token;
        state.role = getRole(payload.token);
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
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo; //because we passed the message when login Success from the controller
        state.token = payload.token;
        state.role = getRole(payload.token);
      });
  },
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
