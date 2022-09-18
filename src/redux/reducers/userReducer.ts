import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_ from "jwt-simple";
import { apiRequestFetch, headers } from "../api";

import {
  UserToken,
  User,
  UserLogin,
  UserData,
  UserRegister,
} from "../types/user";

const initialState: UserData = {
  userList: [],
  userAuth: undefined,
  userLogin: undefined, // for remember me
  userToken: undefined,
};

export const fetchUsers = createAsyncThunk("fetchUser", async () => {
  return await apiRequestFetch("/users");
});

export const loginUser = createAsyncThunk(
  "loginUser",
  async (params: UserLogin) => {
    const settings = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return await apiRequestFetch("/auth/login", settings);
  }
);

export const createUserAddress = createAsyncThunk(
  "createUserAddress",
  async (address: any) => {
    const settings = {
      method: "POST",
      body: JSON.stringify({
        address: address.newAddress.address,
        place: address.newAddress.place,
      }),
      headers: headers,
    };
    return await apiRequestFetch(`/users/${address.userId}/address`, settings);
  }
);

export const updateUserAddress = createAsyncThunk(
  "updateUserAddress",
  async (address: any) => {
    const settings = {
      method: "PUT",
      body: JSON.stringify({
        address: address.newAddress.address,
        place: address.newAddress.place,
      }),
      headers: headers,
    };
    return await apiRequestFetch(
      `/users/${address.userId}/address/${address.addressId}`,
      settings
    );
  }
);

export const deleteUserAddress = createAsyncThunk(
  "deleteUserAddress",
  async (address: any) => {
    const settings = {
      method: "DELETE",
      headers: headers,
    };
    return await apiRequestFetch(
      `/users/${address.userId}/address/${address.addressId}`,
      settings
    );
  }
);

export const getUserAddress = createAsyncThunk(
  "getUserAddress",
  async (userId: any) => {
    const settings = {
      method: "GET",
      headers: headers,
    };
    return await apiRequestFetch(`/users/${userId}/address`, settings);
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (params: UserLogin) => {
    const settings = {
      method: "POST",
      body: JSON.stringify(params),
      headers: headers,
    };
    return await apiRequestFetch(`/auth/logout`, settings);
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (params: UserRegister) => {
    const settings = {
      method: "POST",
      body: JSON.stringify({ user: params }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return await apiRequestFetch(`/users`, settings);
  }
);

export const editUser = createAsyncThunk("editUser", async (params: any) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify({ user: params.user, password: params.password }),
    headers: headers,
  };
  return await apiRequestFetch(`/users/${params?.userId}`, settings);
});

export const authUser = createAsyncThunk("authUser", async (params: any) => {
  headers.Authorization = `Bearer ${params}`
  localStorage.setItem("token", params);
  const settings = {
    method: "GET",
    headers: headers,
  };
  return await apiRequestFetch(`/auth/profile`, settings);
});

const userSlicer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {},
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(
        (user) => user._id != action.payload.userId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

const authSlicer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.userAuth = action.payload;
      state.userLogin = action.payload;
    },
    editProfile: (state, action) => {
      state.userAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userToken = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userToken = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userAuth = action.payload;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userAuth = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      });
  },
});

export const userReducer = userSlicer.reducer;
export const authReducer = authSlicer.reducer;
export const { logout, editProfile } = authSlicer.actions;
export const { addUser, deleteUser } = userSlicer.actions;
