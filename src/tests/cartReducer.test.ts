import {
  addCart,
  addQuantityCart,
  cartReducer,
  deleteCart,
  minusQuantityCart,
} from "../redux/reducers/cartReducer";
import createTestStore from "./store";
import { product } from "./utils/productTestData";

let store = createTestStore();

describe("test cart reducer", () => {
  test("add product to cart list", async () => {
    store.dispatch(addCart({ cart: product }));
    expect(store.getState().cartReducer.cartList).toBeDefined();
  });
  test("update quantity(+) for product in cart list", async () => {
    store.dispatch(addQuantityCart({ id: product._id }));
    const updateCart = store
      .getState()
      .cartReducer.cartList.find((cartLit) => cartLit.product._id == product._id);
    expect(updateCart?.quantity).toEqual(2);
  });
  test("update quantity(-) for product in cart list", async () => {
    store.dispatch(minusQuantityCart({ id: product._id }));
    const updateCart = store
      .getState()
      .cartReducer.cartList.find(
        (cartList) => cartList.product._id == product._id
      );
    expect(updateCart?.quantity).toEqual(1);
  });
  test("remove product from cart list", async () => {
    store.dispatch(deleteCart({ id: product._id }));
    const delCart = store
      .getState()
      .cartReducer.cartList.find(
        (cartLit) => cartLit.product._id === product._id
      );
    expect(delCart).toBeUndefined();
  });
});
