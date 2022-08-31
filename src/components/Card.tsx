import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"
import {
  addCart,
  addQuantityCart,
  minusQuantityCart,
  deleteCart,
} from "../redux/reducers/cartReducer"
/**
 * This a card that displays products information and depends on quantity existence it will show plus and minus button  
 * @param props contains products and quantity information  
 * @returns 
 */
export const Card = (props: any) => {
  const [cart, setCart] = useState()
  const [quantity, setQuantity] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {authRedu:{userAuth:user}, cartRedu : {cartList, allCartList}} = useSelector((state: RootState) => state)
  const add = (id: number) => {
    const found = cartList.findIndex((x) => x.product._id === props.product.id)
    if (found >= 0) {
      dispatch(addQuantityCart({ id: id }))
    }
  }
  const minus = (id: number) => {
    const found = cartList.findIndex((x) => x.product._id === props.product.id)
    if (found >= 0) {
      cartList[found].quantity != 1
        ? dispatch(minusQuantityCart({ id: id }))
        : dispatch(deleteCart({ id: props.product.id }))
    }
  }
  useEffect(() => {
    if (cart) {
      const found = cartList.findIndex((x) => x.product._id === props.product.id)
      if (found < 0) {
        dispatch(addCart({ cart }))
      } else {
        dispatch(addQuantityCart({ id: props.product.id }))
      }
    }
  }, [quantity])

  const image : any = JSON.parse(JSON.stringify(props.product.imagesId))
  return (
    <div className="card">
      <img
        src={image[0]?.filelocation}
        alt={"Image"}
        onClick={(e) => {
          navigate(`/singleProduct/${props.product.id}`)
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
        <div>
          {user != undefined ? (
            <>
              {props.quantity && (
                <button
                  type="button"
                  className="btncart-minus"
                  onClick={() => {
                    minus(props.product.id)
                  }}
                >
                  -
                </button>
              )}
              <button
                type="button"
                className="btncart"
                onClick={(e) => {
                  e.preventDefault()
                  setCart(props.product)
                  setQuantity(quantity ? false : true)
                }}
              >
                Add Cart
              </button>
              {props.quantity && (
                <button
                  className="btncart-plus"
                  type="button"
                  onClick={() => {
                    add(props.product.id)
                  }}
                >
                  +
                </button>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
