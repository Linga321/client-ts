import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { deleteProduct } from "../redux/reducers/productReducer";

library.add(faTrashCan, faSquarePen);
/**
 * This is a Product single card
 * @deleteProductById is delete function for deleteting the product card from store using id
 * @param props.product cantains single product information
 * @returns AdminCard
 */
export const AdminCard = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    authRedu: { userAuth: user },
  } = useSelector((state: RootState) => state);

  const deleteProductById = (id: number) => {
    dispatch(deleteProduct({ id: id }));
  };
  return (
    <div className="card">
      <img
        src={props.product.imagesId[0].filelocation}
        alt={"Image"}
        onClick={(e) => {
          navigate(`/SingleProduct/${props.product._id}`);
        }}
      />
      <div className="card-content">
        <div className="card-content__article">
          <article>
            <h2>{props.product.title}</h2>
            <h3>${props.product.price}</h3>
            <p>{props.product.description}</p>
            {props.quantity && (
              <div>
                <p>quantity: {props.quantity}</p>
                <p>Total: {props.product.price * props.quantity}</p>
              </div>
            )}
          </article>
        </div>
        <div className="admin-action-bar">
          {user && (
            <>
              <FontAwesomeIcon
                icon={faSquarePen}
                onClick={(e) => {
                  e.preventDefault()
                  props.setProductId(props.product._id);
                  document.documentElement.style.setProperty(
                    "--dynamic-popup-product",
                    "block"
                  );
                }}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={(e) => {
                  e.preventDefault()
                  deleteProductById(props.product._id);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
