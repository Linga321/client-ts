import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestFetch } from "../api";

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

export const uploadFile = createAsyncThunk(
  "uploadFile",
  async (filedata: any) => {
    const formData = new FormData();
    formData.append("image", filedata.file);
    if (filedata.imageId) {
      formData.append("imageId", filedata.imageId);
      formData.append("fileName", filedata.fileName);
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

const fileSlicer = createSlice({
  name: "fileReducer",
  initialState: initialState,
  reducers: {
    addFile: (state, action) => {
      state = action.payload;
    },
    deleteFile: (state, action) => {},
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
      });
  },
});

export const fileReducer = fileSlicer.reducer;
export const { addFile, deleteFile } = fileSlicer.actions;
