import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { getUserAllCartApi } from "../redux/reducers/cartReducer";

import { RootState } from "../redux/store";

const Profile = () => {
  const {
    authRedu: { userAuth: user },
    cartRedu: { allCartList },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const image = user?.avatar && JSON.parse(JSON.stringify(user?.avatar));
  const cart = {
    userId: user?._id,
    status: "Pending",
  };
  const getUserCarts = async() => {
    await dispatch(getUserAllCartApi(cart));
  };
  useEffect(() => {
    getUserCarts();
    console.log(allCartList)
  }, []);
  return (
    <>
      <div aria-describedby="Profile page" className="profile-container">
        {user && (
          <>
            <div className="profile">
              <h1>Hello {user.firstName + " " + user.lastName}</h1>
              <img
                src={
                  image
                    ? image.filelocation
                    : "http://localhost:5000/1661504600992i9g39672c0ihebgec680e6gc77_default_profile.png"
                }
                alt="User Pic"
              />
              <p> You are a {user.role}</p>
              <p> Email: {user.email}</p>
              <input
                type="submit"
                onClick={() => {
                  navigate("/edit");
                }}
                value="Edit Profile"
              />
            </div>
            <div>
              {allCartList && (
                <div className="cart-order-list">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>-</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCartList.length > 0 &&
                        allCartList.map((cart: any, index) => {
            
                          let outputDate = new Date(cart.createdAt).toDateString()
                          return (
                            <tr key={cart._id}>
                              <td>{cart._id}</td>
                              <td>{cart.status}</td>
                              <td>{outputDate}</td>
                              <td><button onClick={()=>(navigate(`/carts/${index}`))}>View</button></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
