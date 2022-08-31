import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import "./assets/css/bootstrap.min.css";
import "./assets/scss/style.scss";

import { useAppDispatch } from "./redux/hooks";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import Carts from "./pages/Carts";
import ProductForm from "./components/ProductFrom";
import { RootState } from "./redux/store";
import { getTheme } from "./utils/colors";
import Admin from "./pages/Admin";
import { fetchCategory } from "./redux/reducers/categoryReducer";
import { fetchProducts } from "./redux/reducers/productReducer";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import ProfileEditFrom from "./components/ProfileEditFrom";
import Footer from "./components/Footer";

function App(probs: any) {
  const activeTheme = getTheme();
  const {
    authRedu: { userAuth: auth },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts("offset=0&limit=10"));
    dispatch(fetchCategory());
  }, []);
  const handle = useFullScreenHandle();
  return (
    <div className={activeTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            {auth?.role == "Admin" ? (
              <Route index element={<Admin />} />
            ) : (
              <Route index element={<Home />} />
            )}
            <Route path="/singleproduct/:id" element={<SingleProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categoryId" element={<Products />} />
            <Route
              path="/products/search/:productName"
              element={<Products />}
            />
            {auth && (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/carts/:mode" element={<Carts />} />
                <Route path="/edit" element={<ProfileEditFrom />} />
              </>
            )}
            <Route path="/*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
