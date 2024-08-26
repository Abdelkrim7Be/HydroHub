import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_sellers = createAsyncThunk(
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message_seller_admin = createAsyncThunk(
  "chat/send_message_seller_admin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/message-send-seller-admin`, info, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_message = createAsyncThunk(
  "chat/get_admin_message",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_seller_message = createAsyncThunk(
  "chat/get_seller_message",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_latest_messages = createAsyncThunk(
  "chat/get_latest_messages",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/latest-messages`, {
        withCredentials: true,
      });
      //   console.log("Fetched Latest Messages:", data);
      return fulfillWithValue(data);
    } catch (error) {
      //   console.log("Error fetching latest messages:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    messages: [],
    activeSeller: [],
    sellers: [],
    seller_admin_message: [],
    currentSeller: {},
    latestMessages: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessages: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    updateSellerMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
      })
      .addCase(send_message_seller_admin.fulfilled, (state, { payload }) => {
        state.seller_admin_message = [
          ...state.seller_admin_message,
          payload.message,
        ];
        state.successMessage = "Message sent successfully.";
      })
      .addCase(get_admin_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      .addCase(get_seller_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
      })
      .addCase(get_latest_messages.fulfilled, (state, { payload }) => {
        state.latestMessages = payload.messages;
      });
  },
});

export const {
  messageClear,
  updateMessages,
  updateSellers,
  updateAdminMessage,
  updateSellerMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
