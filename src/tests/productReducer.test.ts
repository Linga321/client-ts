import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../redux/reducers/productReducer";
import createTestStore from "./store";
import { editProduct, product } from "./utils/productTestData";

let store = createTestStore();

describe("test product reducer", () => {
  test("product list should have 10 product", async () => {
    // only this will call function the api, others will affect only local store
    await store.dispatch(fetchProducts("offset=0&limit=10"));
    const result = store.getState().productReducer.productList;
    expect(result.length).toBe(10);
  });
  test("should delete the product", async () => {
    const result = store.getState().productReducer.productList;
    await store.dispatch(deleteProduct({ id: result[1]._id }));
    expect(store.getState().productReducer.productList.length).toBe(9);
  });
  test("should create a new product info", async () => {
    await store.dispatch(addProduct(product));
    const result = store.getState().productReducer.productList;
    expect(store.getState().productReducer.productList.length).toBe(10);
  });
  test("should update the product", async () => {
    const result = store.getState().productReducer.productList;
    editProduct._id = result[1]._id; // second item id will set to modify
    await store.dispatch(updateProduct(editProduct));
    expect(store.getState().productReducer.productList[1]).toEqual(editProduct);
  });
});
