import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "../redux/reducers/cartReducer"
import { categoryReducer } from "../redux/reducers/categoryReducer"
import { fileReducer } from "../redux/reducers/fileReducer"
import { productReducer } from "../redux/reducers/productReducer"
import { authReducer, userReducer } from "../redux/reducers/userReducer"

const createTestStore = () => {
    const store = configureStore({
        reducer: {
            productReducer,
            cartReducer,
            categoryReducer,
            userReducer,
            authReducer,
            fileReducer,
        }
    })
    return store
}

export default createTestStore

