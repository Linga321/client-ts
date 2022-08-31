import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { FileUpload } from "./FileUpload";
import { Category } from "../redux/types/category";
import {
  addProduct,
  createProductApi,
  updateProduct,
  updateProductApi,
} from "../redux/reducers/productReducer";

function ProductForm(props: any) {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [errorMeg, setErrorMeg] = useState("");
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);
  const product = productList[props.productIndex];

  useEffect(() => {
    if (product && product._id) {
      setProductId(product._id ? product._id : "");
      setTitle(product.title ? product.title : "");
      setPrice(product.price ? String(product.price) : "");
      setDescription(product ? product.description : "");
      setDiscount(product ? String(product.discount) : "");
      setQuantity(product ? String(product.quantity) : "");
      const categories =
        product.categoryId && JSON.parse(JSON.stringify(product.categoryId));
      const images =
        product.imagesId && JSON.parse(JSON.stringify(product.imagesId));
      if (categories.length > 0) {
        categories.map((category: Category) => {
          setCategoryId((prevCat) => [...prevCat, category?._id]);
        });
      }
      if (images.length > 0) {
        images.map((image: any) => {
          setImages((prevImg) => [...prevImg, image?._id]);
        });
      }
    }
  }, [props.productIndex]);

  const prodctFromFieldValidation =
    title == "" ||
    price == "" ||
    Number(discount) > 5000 ||
    discount == "" ||
    Number(discount) < 0 ||
    Number(discount) > 100 ||
    quantity == "" ||
    categoryId[0] == "" || // at least one image id
    images[0] == ""; // at least one image id
  const dispatch = useAppDispatch();
  const productUpdateOrAdd = () => {
    const editedProduct = {
      title: title,
      price: Number(price),
      description: description,
      discount: Number(discount),
      quantity: Number(quantity),
      categoryId: categoryId,
      imagesId: images,
    };
    if (!prodctFromFieldValidation) {
      if (product) {
        //exist
        dispatch(
          updateProductApi({ product: editedProduct, productId: productId })
        );
        setCategoryId([]);
        setImages([]);
      } else {
        dispatch(createProductApi(editedProduct));
        setCategoryId([]);
        setImages([]);
      }
      document.documentElement.style.setProperty(
        "--dynamic-popup-product",
        "none"
      );
      props.setProductId("");
    } else {
      setErrorMeg("Please fill the required Fields");
    }
  };

  const findCategory = async (cateId: string) => {
    const find = await categoryId.filter((item: string) => item === cateId);
    return find.length > 0 ? true : false;
  };
  const updateCategory = async (cateId: string) => {
    const found = await findCategory(cateId);
    if (cateId !== "Select Categories") {
      if (found) {
        setCategoryId(categoryId.filter((item: string) => item !== cateId));
      } else {
        setCategoryId((prevImg) => [...prevImg, cateId]);
      }
    }
  };
  return (
    <>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={title}
            placeholder="Product name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            max={5000}
            min={1}
            value={Number(price) <= 5000 ? price : ""}
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Discount</label>
          <input
            type="number"
            max={100}
            min={0}
            value={Number(discount) <= 100 ? discount : ""}
            placeholder="% Product discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            max={3000}
            min={0}
            value={Number(quantity) <= 3000 ? quantity : ""}
            placeholder="Number of product"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            multiple
            name="selectCategory"
            value={categoryId}
            onChange={(e) => {
              e.preventDefault();
              updateCategory(e.target.value);
            }}
          >
            {categoryList &&
              categoryList.map((category: Category) => (
                <option
                  className={`${category._id + "selected-category"}`}
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label> Description</label>
          <textarea
            rows={4}
            cols={31}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label> Product Image</label>
          <FileUpload handleFile={setImages} images={images} multi={true} />
        </div>
        <p className="error-message">{errorMeg}</p>
        <div>
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              productUpdateOrAdd();
            }}
            value={(product ? "Update" : "Create") + " Product"}
          />
          <input
            type="button"
            onClick={(e) => {
              e.preventDefault();
              document.documentElement.style.setProperty(
                "--dynamic-popup-product",
                "none"
              );
              props.setProductId(0);
            }}
            value="Cancel"
          />
        </div>
      </form>
    </>
  );
}

export default ProductForm;
