import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestFetch, headers } from "../api";

import { File } from "../types/file";

const initialState: File = {
  imageId: "",
  fileName: "",
  location: "",
};

export const fetchFile = createAsyncThunk(
  "fetchFile",
  async (fileId: string) => {
    return await apiRequestFetch(`/images/${fileId}`);
  }
);

export const getFiles = createAsyncThunk(
  "getFiles",
  async (imagesId: any) => {
    const settings = {
      method: "POST",
      body : JSON.stringify({imagesId}),
      headers: headers,
    };
    return await apiRequestFetch('/images/images', settings);
  }
);

export const uploadFile = createAsyncThunk(
  "uploadFile",
  async (filedata: any) => {
    const formData = new FormData();
    formData.append("image", filedata.file);
    if (filedata.imageId) {
      formData.append("imageId", filedata.imageId);
    }
    const settings = {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return await apiRequestFetch(`/images`, settings);
  }
);

export const deleteFile = createAsyncThunk(
  "uploadFile",
  async (filedata: any) => {
    const settings = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return await apiRequestFetch(`/images/${filedata.imageId}`, settings);
  }
);

const fileSlicer = createSlice({
  name: "fileReducer",
  initialState: initialState,
  reducers: {
    addFile: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFile.fulfilled, (state, action) => {
        if (action.payload._id) {
          state = action.payload;
        }
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        if (action.payload._id) {
          state.imageId = action.payload._id;
          state.fileName = action.payload.filename;
          state.location = action.payload.filelocation;
        }
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        console.log(action.payload)
      });
  },
});

export const fileReducer = fileSlicer.reducer;
export const { addFile } = fileSlicer.actions;
