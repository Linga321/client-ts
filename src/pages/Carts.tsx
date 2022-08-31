import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { CardContainer } from "../components/CardContainer";
import { ProductCart } from "../redux/types/cart";
import { useAppDispatch } from "../redux/hooks";
import AddressForm from "../components/AddressFrom";
import { cancelCart, createCartApi } from "../redux/reducers/cartReducer";
import {
  getUserAddress,
  deleteUserAddress,
} from "../redux/reducers/userReducer";

const Carts = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressEdit, setAddressEdit] = useState({});
  const [addressId, setAddressId] = useState<any>();
  const [errorMeg, setErrorMeg] = useState("");
  const [order, setOrder] = useState(1);
  const [orderItem, setOrderItem] = useState([]);
  let { mode } = useParams();
  let totalAmount = 0;
  const {
    authRedu: { userAuth: user },
    cartRedu: { cartList, allCartList },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const newcart: any = {
    userId: user?._id,
    products: [],
  };
  

  if (cartList.length > 0) {
    cartList.map((cart: ProductCart) => {
      const data = {
        productId: cart?.product._id,
        itemQuantity: cart.quantity,
      };
      newcart.products.push(data);
    });
  }


  let initialState: { filteredCartList: ProductCart[]  } = {
    filteredCartList: [] ,
  }
  let numberOfItem = Object.keys(initialState.filteredCartList).length;
  const dispatch = useAppDispatch();

  const getAddress = async () => {
    const result = await dispatch(getUserAddress(user?._id));
    setAddress(result.payload[0]?.address);
  };
  const proceedOrder = async () => {
    const result = await dispatch(createCartApi(newcart));
  };

  const cancelOrder = async () => {
    const result = await dispatch(cancelCart({}));
  };

  const deleteAddress = async (id: string) => {
    const result = await dispatch(
      deleteUserAddress({ addressId: id, userId: user?._id })
    );
    if (result.payload[0]?._id === user?._id) {
      setAddress(address.filter((item: any) => item?.userAddress._id !== id));
    }
  };

  const handleSubmitAddress = async () => {
    if (mode === "order") {
      if (numberOfItem == 0) {
        cartList.map((cart)=>(initialState.filteredCartList.push(cart) ))
        console.log(initialState.filteredCartList)
      }
    }else {
      allCartList && allCartList[Number(mode)]?.products.map((cart: any) => {
        const data ={product: cart?.productId,
          quantity: cart?.itemQuantity}
          initialState.filteredCartList.push(data)
      });
      console.log(initialState.filteredCartList)
      console.log(cartList)
    
    }
    
  };
  if (numberOfItem===0) {
    handleSubmitAddress();
  }

  useEffect(() => {
    handleSubmitAddress();
    getAddress();
  }, [numberOfItem, loading]);

  return (
    <div className="App" aria-describedby="Cart page">
      {order == 1 && (
        <h4 className="heading-cart">Step 1: Add quantity and edit cart</h4>
      )}
      {order == 2 && (
        <h4 className="heading-cart">Step 2: Select delivery address </h4>
      )}
      {order == 3 && (
        <h4 className="heading-cart">Step 3: Confirm and make the payment </h4>
      )}
      {order == 1 && (
        <>
         <CardContainer carts={initialState.filteredCartList} />
          <div className="page-number">
            <div>
              <button
                type="button"
                value="<"
                onClick={() => {
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
                address.map((user_add: any, index: number) => {
                  return (
                    <div key={user_add?._id} className="user-address">
                      <div
                        onClick={() => {
                          setOrder(3);
                          setAddressId(user_add);
                        }}
                      >
                        <h3>{user_add?.place},</h3>
                        <p>{user_add?.userAddress.street},</p>
                        <p>
                          {user_add?.userAddress.postal},
                          {user_add?.userAddress.city}{" "}
                        </p>
                        <p>{user_add?.userAddress.country},</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setAddressEdit(address[index]);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteAddress(user_add?.userAddress?._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
            <p className="error-message">{errorMeg}</p>
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
                  address={addressEdit}
                  setLoading={setLoading}
                  setErrorMeg={setErrorMeg}
                />
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
                        <td>Delivery Address</td>
                        <td>
                          {addressId && (
                            <div key={addressId?._id} className="user-address">
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
                                <button
                                  onClick={() => {
                                    setOrder(2);
                                  }}
                                >
                                  Change
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="page-number">
                          <button
                            type="button"
                            value="<"
                            onClick={() => {
                              proceedOrder();
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            value="<"
                            onClick={() => {
                              setOrder(1);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              cancelOrder();
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    </tfoot>
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

export default Carts;
