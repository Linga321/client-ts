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
  const [productName, setProductName] = useState("");
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

  const capitalizeTheFirstLetterOfEachWord = (words: string) => {
    let separateWord = words.toLowerCase().split(" ");
    for (let i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  };
  const foundProductIdOrCategoryId = productName; //|| categoryId;
  const filteredProductList = foundProductIdOrCategoryId
    ? productName
      ? productList.filter((product) =>
          product.title.startsWith(
            capitalizeTheFirstLetterOfEachWord(String(productName))
          )
        )
      : productList.filter((product) => {
          let found = false;
          product?.categoryId.map((category: any) => {
            if (category?._id === categoryId) {
              found = true;
            }
          });
          if (found) {
            return product;
            found = false;
          }
        })
    : productList;

  useEffect(() => {
    if (count != 0) {
      const limit = 10;
      dispatch(
        fetchProducts(`/${count}/${limit}/title`)
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
      <div className="searchbar">
        {" "}
        <input
          className="form-container"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          placeholder="Search product and find"
        />
      </div>

      <AdminCardContainer
        cards={filteredProductList}
        setProductId={setProductId}
      />
      <div className="page-number">
        <button
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
        >
          Open Forms
        </button>
      </div>
      <div className="form-popup">
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
