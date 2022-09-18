import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/reducers/productReducer";
import { CardContainer } from "../components/CardContainer";
import { Tags } from "../components/Tags";

const Products = () => {
  const [page, setPage] = useState(0);
  let { categoryId, productName } = useParams();
  const foundProductIdOrCategoryId = productName || categoryId;
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

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
      ? productList.filter((product :any) =>
          product.title.startsWith(
            capitalizeTheFirstLetterOfEachWord(String(productName))
          )
        )
      : productList.filter((product :any ) => {
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

  const getProducts = async()=>{
    if (page != 0) {
      const limit = 10;
      await dispatch(
        fetchProducts(`/${page}/${limit}/title`)
      );
    }
  }

  useEffect(() => {
    getProducts()
  }, [page, productName]);
  return (
    <div className="App" aria-describedby="Product page">
      <div className="categories-container">
        {categoryList &&
          categoryList.map((category :any) => (
            <Tags key={category._id} category={category} />
          ))}
      </div>
      <CardContainer products={filteredProductList} />
      <div className="page-number">
        <button
          type="button"
          onClick={() => {
            page < 20 ? setPage(page + 1) : setPage(page);
          }}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default Products;
