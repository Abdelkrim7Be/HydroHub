import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellerPaymentDetails = createAsyncThunk(
  "payment/gettingSellerPaymentDetails",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/seller-payment-details/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendWithdrawalRequest = createAsyncThunk(
  "payment/sendingWithdrawalRequest",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/withdrawal-request`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaymentRequest = createAsyncThunk(
  "payment/gettingPaymentRequest",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/request`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmPaymentRequest = createAsyncThunk(
  "payment/confirmingPaymentRequest",
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/request-confirm`,
        { paymentId },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPendingAmounts = createAsyncThunk(
  "payment/fetchPendingAmount",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/pending/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWithdrawedAmounts = createAsyncThunk(
  "payment/fetchWithdrawedAmounts",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/withdrawed/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdraws: [],
    successfulWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
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

      .addCase(getSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = payload.pendingWithdraws;
        state.successfulWithdraws = payload.successfulWithdraws;
        state.totalAmount = payload.totalAmount;
        state.availableAmount = payload.availableAmount;
        state.withdrawAmount = payload.withdrawAmount;
        state.pendingAmount = payload.pendingAmount;
      })

      .addCase(sendWithdrawalRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(sendWithdrawalRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(sendWithdrawalRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = [
          ...state.pendingWithdraws,
          payload.withdrawal,
        ];
        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = payload.withdrawal.amount;
      })

      .addCase(getPaymentRequest.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = payload.withdrawalRequest;
      })

      .addCase(confirmPaymentRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(confirmPaymentRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(confirmPaymentRequest.fulfilled, (state, { payload }) => {
        const temp = state.pendingWithdraws.filter(
          (r) => r._id !== payload.payment._id
        );
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = temp;
      })
      .addCase(fetchPendingAmounts.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = payload.pending;
      })
      .addCase(fetchPendingAmounts.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchPendingAmounts.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload?.message || "Error fetching pending amounts";
      })
      .addCase(fetchWithdrawedAmounts.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successfulWithdraws = payload.success;
      })
      .addCase(fetchWithdrawedAmounts.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchWithdrawedAmounts.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload?.message || "Error fetching pending amounts";
      });
  },
});
export const { messageClear, successMessage, errorMessage } =
  paymentReducer.actions;
export default paymentReducer.reducer;
