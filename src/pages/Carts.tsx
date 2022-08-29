import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { CardContainer } from "../components/CardContainer";
import { ProductCart } from "../redux/types/cart";
import { useAppDispatch } from "../redux/hooks";
import AddressForm from "../components/AddressFrom";
import { cancelCart, createCartApi } from "../redux/reducers/cartReducer";
import { getUserAddress } from "../redux/reducers/userReducer";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState<any>();
  const [errorMeg, setErrorMeg] = useState("");
  const [order, setOrder] = useState(1);
  const [orderItem, setOrderItem] = useState([]);
  let totalAmount = 0;
  const {
    authRedu: { userAuth: user },
    cartRedu: { cartList },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const newcart :any= {
    userId: user?._id,
    products: [],
  };

  if (cartList.length > 0) {
    cartList.map((cart: ProductCart) =>{
      const data ={
        productId: cart?.product._id,
        itemQuantity: cart.quantity,
      }
      newcart.products.push(data)
    }
    
    );
  }

  const dispatch = useAppDispatch();

  const proceedOrder = async () => {
    const rse = await dispatch(createCartApi(newcart));
  };
  const cancelOrder = async () => {
    const rse = await dispatch(cancelCart({}));
  };

  const userAdress = async () => {
    const result = await dispatch(getUserAddress(user?._id));
    console.log(result.payload[0]?.address);
    setAddress(result.payload[0]?.address);
  };
  useEffect(() => {
    if (Object.keys(cartList).length == 0) {
      navigate("/products");
    }
  }, [Object.keys(cartList).length]);

  return (
    <div className="App" aria-describedby="Cart page">
      {order == 1 && (
        <>
          <CardContainer carts={cartList} />
          <div className="page-number">
            <div>
              <button
                type="button"
                value="<"
                onClick={() => {
                  userAdress();
                  setOrder(2);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {order == 2 && (
        <>
          <div className="address-container">
            <div className="address-view">
              {address.length > 0 &&
                address.map((user_add: any, index) => {
                  return (
                    <div
                      key={user_add?._id}
                      className="user-address"
                      onClick={() => {
                        setOrder(3);
                        setAddressId(user_add);
                      }}
                    >
                      <div>
                        <h3>{user_add?.place},</h3>
                        <p>{user_add?.userAddress.street},</p>
                        <p>
                          {user_add?.userAddress.postal},
                          {user_add?.userAddress.city}{" "}
                        </p>
                        <p>{user_add?.userAddress.country},</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {loading ? (
              <div className="loading-container" style={{ height: "100vh" }}>
                <div className="loading">
                  <img
                    src={require("../assets/pictures/loading2.gif")}
                    alt="loading"
                  />
                </div>
              </div>
            ) : (
              <div className="form-container">
                <AddressForm
                  setLoading={setLoading}
                  setErrorMeg={setErrorMeg}
                />
                <p className="error-message">{errorMeg}</p>
              </div>
            )}
          </div>
        </>
      )}

      {order == 3 && (
        <>
          <div>
            {loading ? (
              <div className="loading-container" style={{ height: "100vh" }}>
                <div className="loading">
                  <img
                    src={require("../assets/pictures/loading2.gif")}
                    alt="loading"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="cart-order-list">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.length > 0 &&
                        cartList.map((cart: ProductCart) => {
                          const sum =
                            cart.quantity *
                            (cart.product.price -
                              cart.product.price *
                                (cart.product.discount / 100));
                          totalAmount += sum;
                          return (
                            <tr key={cart.product._id}>
                              <td>{cart.product.title}</td>
                              <td>{cart.product.price}</td>
                              <td>{cart.product.discount}</td>
                              <td>{cart.quantity}</td>
                              <td>{sum}</td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total Amount</td>
                        <td>{totalAmount}</td>
                      </tr>
                      <tr>
                        <td>
                          {addressId && (
                            <div
                              key={addressId?._id}
                              className="user-address"
                            >
                              <div>
                                <h3>{addressId?.place},</h3>
                                <p>{addressId?.userAddress.street},</p>
                                <p>
                                  {addressId?.userAddress.postal},
                                  {addressId?.userAddress.city}{" "}
                                </p>
                                <p>{addressId?.userAddress.country},</p>
                              </div>
                              <div>
                                <button onClick={() => {
                                setOrder(2);
                              }}>Change</button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="page-number">
                          <div>
                            <button
                              type="button"
                              value="<"
                              onClick={() => {
                                proceedOrder();
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              value="<"
                              onClick={() => {
                                setOrder(1);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                cancelOrder();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
