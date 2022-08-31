import React from "react";

import { ProductCart } from "../redux/types/cart";
import { Product } from "../redux/types/product";
import { Card } from "./Card";
/**
 * This a card that displays products or productcarts information
 * @param props contains products or productcarts information
 * @returns
 */
export const CardContainer = (props: any) => (
  <div className="cards-container">
    {props.products &&
      props.products.map((product: Product) => (
        <Card key={product._id} product={product} />
      ))}
    {props.carts &&
      props.carts.map((cart: ProductCart) => (
        <Card
          key={cart.product._id}
          product={cart.product}
          quantity={cart.quantity}
        />
      ))}
  </div>
);
