import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestFetch, headers } from "../api";

import { ProductCart, AllProductCart } from "../types/cart";

//cartList: pre order
// allCartList:  post order
const initialState: { cartList: ProductCart[]; allCartList: AllProductCart[] } =
  {
    cartList: [],
    allCartList: [],
  };

export const fetchCarts = createAsyncThunk(
  "fetchCarts",
  async (params: string) => {
    return await apiRequestFetch(`/carts`);
  }
);

export const createCartApi = createAsyncThunk(
  "createCartApi",
  async (cart: any) => {
    const settings = {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: headers,
    };
    return await apiRequestFetch(`/carts`, settings);
  }
);

export const getUserAllCartApi = createAsyncThunk(
  "getUserAllCartApi",
  async (cart: any) => {
    const settings = {
      method: "GET",
      headers: headers,
    };
    return await apiRequestFetch(
      `/carts/${cart.userId}/${cart.status}`,
      settings
    );
  }
);

export const updateCartApi = createAsyncThunk(
  "updateCartApi",
  async (cart: any) => {
    const settings = {
      method: "PUT",
      body: JSON.stringify(cart.cart),
      headers: headers,
    };
    return await apiRequestFetch(`/carts/${cart.cartId}`, settings);
  }
);

export const deleteCartApi = createAsyncThunk(
  "deleteCartApi",
  async (cartId: string) => {
    const settings = {
      method: "DELETE",
      headers: headers,
    };
    return await apiRequestFetch(`/carts/${cartId}`, settings);
  }
);

const cartSlicer = createSlice({
  name: "cartReducer",
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartList.push({
        product: action.payload.cart,
        quantity: 1,
      });
    },
    addQuantityCart: (state, action) => {
      state.cartList = state.cartList.map((cart) => {
        if (cart.product._id === action.payload.id) {
          cart.quantity = cart.quantity + 1;
        }
        return cart;
      });
    },
    minusQuantityCart: (state, action) => {
      state.cartList = state.cartList.map((cart) => {
        if (cart.product._id === action.payload.id) {
          if (cart.quantity == 1) {
            //cartSlicer.caseReducers.deleteCart(state, action)
            state.cartList = state.cartList.filter(
              (prodart) => prodart.product._id != action.payload.id
            );
          } else {
            cart.quantity = cart.quantity - 1;
          }
        }
        return cart;
      });
    },
    deleteCart: (state, action) => {
      if (action.payload?.id == "reset") {
        state.cartList = [];
      } else {
        if (action.payload?.id)
          state.cartList = state.cartList.filter(
            (prodart) => prodart.product._id != action.payload?.id
          );
      }
    },
    cancelCart: (state, action) => {
      state.cartList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => {
        if (action.payload?._id) {
          state.allCartList = action.payload;
        }
      })
      .addCase(getUserAllCartApi.fulfilled, (state, action) => {
        if (action.payload) {
          state.allCartList = action.payload;
        }
      })
      .addCase(createCartApi.fulfilled, (state, action) => {
        if (action.payload?._id) {
          state.cartList = [];
        }
      });
  },
});

export const cartReducer = cartSlicer.reducer;
export const {
  addCart,
  deleteCart,
  addQuantityCart,
  minusQuantityCart,
  cancelCart,
} = cartSlicer.actions;
