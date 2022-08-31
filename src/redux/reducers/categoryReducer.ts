import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestFetch, headers } from "../api";

import { Category, CategoryList } from "../types/category";

const initialState: CategoryList = {
  categoryList: [],
  categoryFilterList: [],
};

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  return await apiRequestFetch("/category");
});

export const createCategoryApi = createAsyncThunk(
  "createCategoryApi",
  async (category: any) => {
    const settings = {
      method: "POST",
      body: JSON.stringify({ category }),
      headers: headers,
    };
    return await apiRequestFetch("/category", settings);
  }
);

export const updateCategoryApi = createAsyncThunk(
  "updateCategoryApi",
  async (category: any) => {
    const settings = {
      method: "PUT",
      body: JSON.stringify({ category: category.categoryObject }),
      headers: headers,
    };
    return await apiRequestFetch(`/category/${category.categoryId}`, settings);
  }
);

export const deleteCategoryApi = createAsyncThunk(
  "deleteCategoryApi",
  async (categoryId: string) => {
    const settings = {
      method: "DELETE",
      headers: headers,
    };
    return await apiRequestFetch(`/category/${categoryId}`, settings);
  }
);

const categorySlicer = createSlice({
  name: "categoryReducer",
  initialState: initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categoryList.push(action.payload);
    },
    filtercategory: (state, action) => {
      state.categoryFilterList.push(action.payload.id);
    },
    deleteCategory: (state, action) => {
      state.categoryList = state.categoryList.filter(
        (category) => category._id != action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categoryList = action.payload;
      })
      .addCase(createCategoryApi.fulfilled, (state, action) => {
        state.categoryList.push(action.payload);
      })
      .addCase(updateCategoryApi.fulfilled, (state, action) => {
        state.categoryList = state.categoryList.map((category) => {
          if (action.payload && category._id == action.payload._id) {
            return action.payload;
          } else {
            return category;
          }
        });
      })
      .addCase(deleteCategoryApi.fulfilled, (state, action) => {
        state.categoryList = state.categoryList.filter(
          (category) => category._id != action.payload.id
        );
      });
  },
});

export const categoryReducer = categorySlicer.reducer;
export const { addCategory, deleteCategory } = categorySlicer.actions;
