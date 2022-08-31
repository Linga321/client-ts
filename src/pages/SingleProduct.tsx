import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import ProductReviewForm from "../components/ProductReviewFrom";
import { getProductRateApi } from "../redux/reducers/productReducer";

const SingleProduct = () => {
  let { id } = useParams();
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(3);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const productList = useSelector(
    (state: RootState) => state.productRedu.productList
  );
  let product = productList.filter((item) => {
    return item._id == id;
  });

  let imageView = product && product[0]?.imagesId;
  let numberOfImg = imageView && imageView.length;
  const result = async () => {
    const rse = await dispatch(getProductRateApi(id as string));
    setRating(rse.payload?.avgRate);
  };
  useEffect(() => {
    imageView = product && product[0]?.imagesId;
    numberOfImg = imageView && imageView.length;
    result();
  }, [count]);
  return (
    <div aria-describedby="single page" className="single-product">
      {imageView && (
        <div
          onClick={(e) => {
            navigate(`/SingleProduct/${product[0]._id}`);
          }}
        >
          <div className="slideshow-container">
            {numberOfImg > 0 &&
              imageView.map((currImg: any, index) => (
                <div
                  key={currImg?._id}
                  className={count == index ? "active" : "mySlides fade"}
                >
                  <div className="numbertext">
                    {index + 1} / {numberOfImg}
                  </div>
                  <img
                    src={currImg?.filelocation}
                    alt={`Image ${index}`}
                    className="d-block w-60"
                  />
                </div>
              ))}
            <div className="dot-contaner">
              {numberOfImg > 0 &&
                imageView.map((currImg: any, index) => (
                  <span
                    key={currImg?._id}
                    className="dot"
                    onClick={(e) => {
                      setCount(index);
                    }}
                  ></span>
                ))}
            </div>
            <a
              className="prev"
              onClick={(e) => {
                e.preventDefault();
                if (count > 0) {
                  setCount(count - 1);
                }
              }}
            >
              ❮
            </a>
            <a
              className="next"
              onClick={(e) => {
                e.preventDefault();
                if (count < numberOfImg - 1) {
                  setCount(count + 1);
                }
              }}
            >
              ❯
            </a>
          </div>
          <div className="card-content">
            <article>
              <h2>{product[0].title}</h2>
              <h3>${product[0].price}</h3>
              <p>{product[0].description}</p>
              <div className="rating-button">
                <img
                  className={rating >= 1 ? "star-active" : ""}
                  src={require("../assets/pictures/star.png")}
                  alt="rate 1"
                />
                <img
                  className={rating >= 2 ? "star-active" : ""}
                  src={require("../assets/pictures/star.png")}
                  alt="rate 2"
                />
                <img
                  className={rating >= 3 ? "star-active" : ""}
                  src={require("../assets/pictures/star.png")}
                  alt="rate 3"
                />
                <img
                  className={rating >= 4 ? "star-active" : ""}
                  src={require("../assets/pictures/star.png")}
                  alt="rate 4"
                />
                <img
                  className={rating >= 5 ? "star-active" : ""}
                  src={require("../assets/pictures/star.png")}
                  alt="rate 5"
                />
              </div>
            </article>
          </div>
          <div className="product-review">
            <ProductReviewForm productId={product[0]._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
