import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { FileUpload } from "./FileUpload";
import { Category } from "../redux/types/category";
import { fetchCategory } from "../redux/reducers/categoryReducer";
import { addProduct, createProductApi, updateProduct, updateProductApi } from "../redux/reducers/productReducer";

function ProductForm(props: any) {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState<string[]>( []);
  const [images, setImages] = useState<string[]>([]);
  const [errorMeg, setErrorMeg] = useState("");
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);
  const product = productList[props.productIndex];

  useEffect(()=>{

    if(product && product._id){
      setProductId(product._id ? product._id :"")
      setTitle(product.title ?product.title :"") 
      setPrice(product.price ? String(product.price) :"") 
      setDescription(product ?product.description :"") 
      setDiscount(product ?String(product.discount) :"") 
      setQuantity(product ?String(product.quantity) :"") 
      const categories = product.categoryId && JSON.parse(JSON.stringify(product.categoryId))
      const images = product.imagesId && JSON.parse(JSON.stringify(product.imagesId))
      if(categories.length > 0){
        categories.map((category: Category)=>{
          setCategoryId((prevCat) => [...prevCat, category?._id])
        })
      }
      if(images.length > 0){
        images.map((image: any)=>{
          setImages((prevImg) => [...prevImg, image?._id])
        })
      }
    }
    
  },[props.productIndex])

  const prodctFromFieldValidation =
  title == "" ||
  price == "" ||
  discount == "" ||
  quantity == "" ||
  categoryId[0] == "" //|| // at least one image id
 // images[0] == "" ; // at least one image id
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
    if(!prodctFromFieldValidation){
      if (product) { //exist
        dispatch(updateProductApi({product:editedProduct, productId:productId}));
        setCategoryId([]);
        setImages([]);
      }else{
        dispatch(createProductApi(editedProduct));
        setCategoryId([]);
        setImages([]);
      }
      document.documentElement.style.setProperty(
        "--dynamic-popup-product",
        "none"
      );
      props.setProductId("");
    }else{
      setErrorMeg("Please fill the required Fields")
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
          max={3000}
          min={1}
          value={price}
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
          value={discount}
          placeholder="% Product Price"
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          max={3000}
          min={0}
          value={quantity}
          placeholder="Number of product"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <select
          name="selectCategory"
          value={categoryId[0]}
          onChange={(e) => setCategoryId((prevImg) => [...prevImg, e.target.value])}
        >
          {categoryList &&
            categoryList.map((category: Category) => (
              <option key={category._id} value={category._id}>
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
        <FileUpload handleFile={setImages} multi={true} />
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
