import { configureStore, PreloadedState } from "@reduxjs/toolkit";

import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { fileReducer } from "./reducers/fileReducer";
import { productReducer } from "./reducers/productReducer";
import { authReducer, userReducer } from "./reducers/userReducer";
import { AllProductCart, ProductCart } from "./types/cart";
import { UserData, UserLogin, UserToken } from "./types/user";

let preUser: UserData = {
  userList: [],
  userAuth: undefined,
  userLogin: <UserLogin>{}, // for remember me
  userToken: <UserToken>{},
};

let preCart: { cartList: ProductCart[]; allCartList: AllProductCart[] } = {
  cartList: [],
  allCartList: [],
};

const getUser = localStorage.getItem("user");
const getCart = localStorage.getItem("cart");
if (!!getUser) {
  preUser = JSON.parse(getUser);
}
if (!!getCart) {
  preCart = JSON.parse(getCart);
}
const preloaded = {
  authRedu: preUser,
  cartRedu: preCart,
};

const saveState = (state: RootState) => {
  try {
    const userReducer = JSON.stringify(state.authRedu);
    const cartReducer = JSON.stringify(state.cartRedu);
    localStorage.setItem("user", userReducer);
    localStorage.setItem("cart", cartReducer);
  } catch (e) {
    console.log(e);
  }
};

export const store = configureStore({
  reducer: {
    productRedu: productReducer,
    cartRedu: cartReducer,
    categoryRedu: categoryReducer,
    userRedu: userReducer,
    authRedu: authReducer,
    fileRedu: fileReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => saveState(store.getState()));
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
