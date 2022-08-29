import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/reducers/productReducer";
import { AdminCardContainer } from "../components/AdminCardContainer";
import { AdminTags } from "../components/AdminTags";
import ProductForm from "../components/ProductFrom";
import CategoryForm from "../components/CategoryFrom";

const Admin = () => {
  const [count, setCount] = useState(0);
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useAppDispatch();
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);

  const indexProduct = productList.findIndex(
    (product) => product._id === productId
  );

  const indexCategory = categoryList.findIndex(
    (category) => category._id === categoryId
  );
   
  useEffect(() => {
    if (count != 0) {
      const limit = 10;
      const newOffset = count * limit;
      dispatch(
        fetchProducts(`offset=${count == 0 ? 0 : newOffset}&limit=${limit}`)
      );
    }
  }, [count]);

  return (
    <div className="App" aria-describedby="Admin page">
      <div className="categories-container">
        {categoryList &&
          categoryList.map((card) => (
            <AdminTags
              key={card._id}
              category={card}
              setCategoryId={setCategoryId}
            />
          ))}
      </div>
      <AdminCardContainer cards={productList} setProductId={setProductId} />
      <div className="page-number">
        <button
            type="button"
            onClick={() => {
              count < 20 ? setCount(count + 1) : setCount(count);
            }}
          >
            More
        </button>
      </div>
      <div className="form-popup">
        <input
         type="submit"
          onClick={() => {
            document.documentElement.style.setProperty(
              "--dynamic-popup-category",
              "block"
            );
            document.documentElement.style.setProperty(
              "--dynamic-popup-product",
              "block"
            );
          }}
          value="Open Forms"
        />
          
        <div className="form-popup-product form-container">
          <ProductForm
            productIndex={indexProduct}
            setProductId={setProductId}
          />
        </div>
        <div className="form-popup-category form-container">
          <CategoryForm
            categoryIndex={indexCategory}
            setCategoryId={setCategoryId}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
