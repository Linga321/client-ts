import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import {
  createProductReviewApi,
  getProductReviewApi,
  updateProductReviewApi,
} from "../redux/reducers/productReducer";

function ReviewReviewForm(props: any) {
  let { id } = useParams();
  const [productId, setReviewId] = useState(props.productId);
  const [productReview, setProductReview] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errorMeg, setErrorMeg] = useState("");
  const {
    authRedu: { userAuth },
    productRedu: { productReviewList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);
  const product = productReviewList.filter((item) => {
    return item._id === props?.setPoductId;
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductReviewApi({ productId: productId }));
    // if (product && product._id) {
    //   setReviewId(product._id ? product._id : "");
    //   const categories =
    //     product.categoryId && JSON.parse(JSON.stringify(product.categoryId));
    //   const images =
    //     product.imagesId && JSON.parse(JSON.stringify(product.imagesId));
    // }
  }, [props.productIndex || id]);

  const reviewValidation = review == "";

  const productUpdateOrAdd = () => {
    const reviewData = {
      userId: userAuth?._id,
      productId: productId,
      rate: rating ? rating : 3,
      comment: review,
    };
    if (!reviewValidation) {
      if (product.length > 0) {
        //exist
        dispatch(
          updateProductReviewApi({ review: reviewData, productId: productId })
        );
      } else {
        dispatch(createProductReviewApi(reviewData));
      }
      document.documentElement.style.setProperty(
        "--dynamic-popup-product",
        "none"
      );
      dispatch(getProductReviewApi({ productId: productId }));
    } else {
      setErrorMeg("Please fill the required Fields");
    }
  };

  return (
    <div className="review-main-container" >
      <div className="review-container">
        <div></div>
        <div>
          {productReviewList.map((review) => {
            if (review?.userId) {
              const user: any = review?.userId;
              return (
                <div key={review?._id} className="review">
                  <div className="review-header">
                    <img
                      src={
                        user?.avatar?.filelocation
                          ? user?.avatar?.filelocation
                          : "http://localhost:5000/1661504600992i9g39672c0ihebgec680e6gc77_default_profile.png"
                      }
                      alt="user img"
                    />
                   <p> {user.firstName}</p>
                  </div>
                  <div className="review-footer">
                      <p> {review.comment}</p>
                    </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="form-container">
        {userAuth?._id && <form>
          <div className="rating-button">
            <img
              className={rating >= 1 ? "star-active" : ""}
              src={require("../assets/pictures/star.png")}
              onClick={(e) => setRating(1)}
              alt="rrat 1"
            />
            <img
              className={rating >= 2 ? "star-active" : ""}
              src={require("../assets/pictures/star.png")}
              onClick={(e) => setRating(2)}
              alt="rrat 2"
            />
            <img
              className={rating >= 3 ? "star-active" : ""}
              src={require("../assets/pictures/star.png")}
              onClick={(e) => setRating(3)}
              alt="rrat 3"
            />
            <img
              className={rating >= 4 ? "star-active" : ""}
              src={require("../assets/pictures/star.png")}
              onClick={(e) => setRating(4)}
              alt="rrat 4"
            />
            <img
              className={rating >= 5 ? "star-active" : ""}
              src={require("../assets/pictures/star.png")}
              onClick={(e) => setRating(5)}
              alt="rrat 5"
            />
          </div>
          <div>
            <label> Review</label>
            <textarea
              rows={4}
              cols={31}
              placeholder="Product Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <p className="error-message">{errorMeg}</p>
          <div>
            <input
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                productUpdateOrAdd();
              }}
              value={(product.length > 0 ? "Update" : "Create") + " Review"}
            />
            <input
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.documentElement.style.setProperty(
                  "--dynamic-popup-product",
                  "none"
                );
              }}
              value="Cancel"
            />
          </div>
        </form>}
      </div>
    </div>
  );
}

export default ReviewReviewForm;
