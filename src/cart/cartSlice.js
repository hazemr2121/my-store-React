import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("https://fakestoreapi.com/carts/1");
  return response.data;
});

export const fetchProductDetails = createAsyncThunk(
  "cart/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default cartSlice.reducer;
