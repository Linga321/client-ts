import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/reducers/productReducer";
import { CardContainer } from "../components/CardContainer";
import { Tags } from "../components/Tags";

const Products = () => {
  let { categoryId, productName } = useParams();
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const foundProductIdOrCategoryId = productName || categoryId;
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);

  const capitalizeTheFirstLetterOfEachWord = (words: string) => {
    let separateWord = words.toLowerCase().split(" ");
    for (let i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  };

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
      const newOffset = count * limit;
      dispatch(
        fetchProducts(`offset=${count == 0 ? 0 : newOffset}&limit=${limit}`)
      );
    }
  }, [count, productName]);
  return (
    <div className="App" aria-describedby="Product page">
      <div className="categories-container">
        {categoryList &&
          categoryList.map((category) => (
            <Tags key={category._id} category={category} />
          ))}
      </div>
      <CardContainer products={filteredProductList} />
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
    </div>
  );
};

export default Products;
