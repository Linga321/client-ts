import { Product } from "../../redux/types/product";
import {category} from './categoryTestData'

export const product: Product = {
  _id: "100",
  title: "tesing",
  price: 150,
  description: "test description",
  discount: 0,
  quantity: 100,
  categoryId: [category._id],
  imagesId: ["https://api.lorem.space/image/face?w=640&h=480&r=6450"],
};

export const editProduct: Product = {
  _id: "undefined",
  title: "tesing 2",
  price: 500,
  description: "test description 3",
  discount: 0,
  quantity: 100,
  categoryId: [category._id],
  imagesId: ["https://api.lorem.space/image"],
};
