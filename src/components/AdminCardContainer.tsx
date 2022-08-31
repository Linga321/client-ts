import React from "react";

import { Product } from "../redux/types/product";
import { AdminCard } from "./AdminCard";
/**
 * This is a Product card container that containes every single card
 * @param props.product cantains list of products information
 * @returns AdminCardContainer
 */
export const AdminCardContainer = (props: any) => (
  <div className="cards-container">
    {props.cards &&
      props.cards.map((card: Product) => (
        <AdminCard
          key={card._id}
          product={card}
          setProductId={props.setProductId}
        />
      ))}
  </div>
);
