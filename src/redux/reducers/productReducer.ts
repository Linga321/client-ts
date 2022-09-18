import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestFetch, headers } from "../api";

import { Product, Review } from "../types/product";

const initialState: { productList: Product[]; productReviewList: Review[] } = {
  productList: [],
  productReviewList: [],
};
/**
 * #(params)
 */

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (params: string) => {
    return await apiRequestFetch(`/products${params}`);
  }
);

export const createProductApi = createAsyncThunk(
  "createProductApi",
  async (product: any) => {
    const settings = {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: headers,
    };
    return await apiRequestFetch("/products", settings);
  }
);

export const updateProductApi = createAsyncThunk(
  "updateProductApi",
  async (product: any) => {
    const settings = {
      method: "PUT",
      body: JSON.stringify(product.product),
      headers: headers,
    };
    return await apiRequestFetch(`/products/${product.productId}`, settings);
  }
);

export const deleteProductApi = createAsyncThunk(
  "deleteProductApi",
  async (productId: string) => {
    const settings = {
      method: "DELETE",
      headers: headers,
    };
    return await apiRequestFetch(`/products/${productId}`, settings);
  }
);

export const fetchProductsReview = createAsyncThunk(
  "fetchProductsReview",
  async (params: string) => {
    return await apiRequestFetch(`/products/review`);
  }
);

export const createProductReviewApi = createAsyncThunk(
  "createProductReviewApi",
  async (review: any) => {
    const settings = {
      method: "POST",
      body: JSON.stringify(review),
      headers: headers,
    };
    return await apiRequestFetch("/products/review", settings);
  }
);

export const getProductReviewApi = createAsyncThunk(
  "getProductReviewApi",
  async (review: any) => {
    const settings = {
      method: "GET",
      headers: headers,
    };
    return await apiRequestFetch(
      `/products/${review.productId}/review`,
      settings
    );
  }
);

export const getProductRateApi = createAsyncThunk(
  "getProductRateApi",
  async (productId: any) => {
    const settings = {
      method: "GET",
      headers: headers,
    };
    return await apiRequestFetch(
      `/products/${productId}/review/rate`,
      settings
    );
  }
);

export const updateProductReviewApi = createAsyncThunk(
  "updateProductReviewApi",
  async (review: any) => {
    const settings = {
      method: "PUT",
      body: JSON.stringify(review.review),
      headers: headers,
    };
    return await apiRequestFetch(
      `/products/${review.productId}/review`,
      settings
    );
  }
);

export const deleteProductReviewApi = createAsyncThunk(
  "deleteProductReviewApi",
  async (reviewId: string) => {
    const settings = {
      method: "DELETE",
      headers: headers,
    };
    return await apiRequestFetch(`/products/review/${reviewId}`, settings);
  }
);

const productSlicer = createSlice({
  name: "productReducer",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product._id != action.payload.id
      );
    },
    updateProduct: (state, action) => {
      state.productList = state.productList.map((product) => {
        if (product._id == action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        action.payload.map((product: Product) =>
          state.productList.push(product)
        );
      })
      .addCase(createProductApi.fulfilled, (state, action) => {
        if (action.payload._id) {
          state.productList.push(action.payload);
        }
      })
      .addCase(updateProductApi.fulfilled, (state, action) => {
        state.productList = state.productList.map((product) => {
          if (product._id == action.payload._id) {
            return action.payload;
          } else {
            return product;
          }
        });
      })
      .addCase(deleteProductApi.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product._id != action.payload._id
        );
      })
      .addCase(getProductRateApi.fulfilled, (state, action) => {})
      .addCase(getProductReviewApi.fulfilled, (state, action) => {
        state.productReviewList = action.payload;
      })
      .addCase(createProductReviewApi.fulfilled, (state, action) => {
        if (action.payload._id) {
          state.productReviewList.push(action.payload);
        }
      })
      .addCase(updateProductReviewApi.fulfilled, (state, action) => {
        state.productReviewList = state.productReviewList.map((review) => {
          if (review._id == action.payload._id) {
            return action.payload;
          } else {
            return review;
          }
        });
      })
      .addCase(deleteProductReviewApi.fulfilled, (state, action) => {
        state.productReviewList = state.productReviewList.filter(
          (review) => review._id != action.payload._id
        );
      });
  },
});

export const productReducer = productSlicer.reducer;
export const { addProduct, deleteProduct, updateProduct } =
  productSlicer.actions;
