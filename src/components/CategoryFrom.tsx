import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { FileUpload } from "./FileUpload";
import { Category } from "../redux/types/category";
import {
  addCategory,
  createCategoryApi,
  updateCategoryApi,
} from "../redux/reducers/categoryReducer";

/**
 * This is an category form
 * @handleSubmit is create or update category
 * @param props.categoryIndex cantains catecory index that store in categoryList
 * @returns CategoryForm
 */

function CategoryForm(props: any) {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errorMeg, setErrorMeg] = useState("");
  const dispatch = useAppDispatch();
  const categoryList = useSelector(
    (state: RootState) => state.categoryRedu.categoryList
  );
  const category = categoryList[props.categoryIndex];

  useEffect(() => {
    setCategoryId(category?._id ? category._id : "");
    setName(category?.name ? category.name : "");
    setImage(category?.image ? category.image : "");
  }, [props.categoryIndex]);

  const handleSubmit = async () => {
    const categoryObject = {
      name: name,
      image: image,
    };
    const validateField = name === "" || image === "";
    if (!validateField) {
      if (category) {
        // if category loaded for edit
        await dispatch(
          updateCategoryApi({
            categoryId: categoryId,
            categoryObject: categoryObject,
          })
        );
      } else {
        await dispatch(createCategoryApi(categoryObject));
      }
      document.documentElement.style.setProperty(
        "--dynamic-popup-category",
        "none"
      );
      props.setCategoryId("");
    } else {
      setErrorMeg("Name and Image required");
    }
  };

  return (
    <>
      <form className="categoryform">
        <div>
          <label>Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label> Category Image</label>
          <FileUpload handleFile={setImage} image={image} />
        </div>
        <p className="error-message">{errorMeg}</p>
        <div>
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            value={(category ? "Update" : "Create") + "  Category"}
          />
          <input
            type="button"
            onClick={(e) => {
              e.preventDefault();
              document.documentElement.style.setProperty(
                "--dynamic-popup-category",
                "none"
              );
              props.setCategoryId(0);
            }}
            value="Cancel"
          />
        </div>
      </form>
    </>
  );
}

export default CategoryForm;
