import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";

export const Tags = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(isActive ? false : true);
  };
  const image = props.category?.image && JSON.parse(JSON.stringify(props.category.image))
  return (
    <div
      className={"categories-card " + (isActive? 'tag-active' : '')}
      onClick={(e) => {
        handleClick()
        navigate(`/products/${props.category._id}`);
      }}
    >
      <div className="categories-card-hid">
        <img src={image.filelocation} alt={"Category Image"} />
      </div>
      <div className="categories-content">
        <article>
          <h2 className="hide">{props.category.name}</h2>
          <h4>{props.category.name}</h4>
        </article>
      </div>
    </div>
  );
};
