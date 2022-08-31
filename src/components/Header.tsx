import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faSun,
  faBars,
  faCartShopping,
  faCartPlus,
  faMagnifyingGlass,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/reducers/userReducer";
import { RootState } from "../redux/store";
import { toggleTheme } from "../utils/colors";
import { deleteCart } from "../redux/reducers/cartReducer";
library.add(
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faSun,
  faBars,
  faCartShopping,
  faCartPlus,
  faMagnifyingGlass,
  faCircleChevronDown
);

const Header = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    authRedu: { userAuth: user },
    cartRedu: { cartList },
  } = useSelector((state: RootState) => state);
  const logoutEvent = () => {
    dispatch(deleteCart({ id: "reset" }));
    dispatch(logout(undefined));
    localStorage.removeItem("token");
  };
  let numberOfCarts = cartList && Object.keys(cartList).length;

  return (
    <>
      <nav>
        <div className="navigation-container">
          <div className="drop-menu">
            <FontAwesomeIcon className="dropbtn-menu" icon={faBars} />
            <div className="drop-menu-content">
              <Link to="/"> {user?.role === "Admin" ? "Admin" : "Home"}</Link>
              <Link to="/products">Products</Link>
              <Link to="/carts/order">Carts</Link>
              {user && <Link to="/profile">Profile</Link>}
              <Link
                to={user ? "/" : "/login"}
                onClick={() => {
                  if (user) {
                    logoutEvent();
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {user ? "Logout    " : "Login    "}
                <FontAwesomeIcon
                  icon={user ? faRightFromBracket : faRightToBracket}
                />
              </Link>
            </div>
          </div>
          <div className="logo">Shop(^V^)</div>
          <div className="searchbar">
            <input
              type="search"
              name="serach"
              placeholder="Search Item"
              value={searchKey}
              onChange={(e) => {
                e.preventDefault();
                setSearchKey(e.target.value);
                navigate(`/products/search/${e.target.value}`);
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div className="nav-bar">
            <nav>
              <ul className="topnav">
                <li>
                  <FontAwesomeIcon
                    icon={user ? faRightFromBracket : faRightToBracket}
                    onClick={() => {
                      if (user) {
                        logoutEvent();
                      } else {
                        navigate("/login");
                      }
                    }}
                  />
                </li>
                <li>
                  {" "}
                  <FontAwesomeIcon
                    icon={faSun}
                    onClick={() => {
                      const activeTheme = toggleTheme();
                    }}
                  />
                </li>
                <li>
                  {numberOfCarts > 0 && (
                    <p className="number-of-casts">{numberOfCarts}</p>
                  )}
                  <FontAwesomeIcon
                    icon={numberOfCarts > 0 ? faCartPlus : faCartShopping}
                    onClick={() => {
                      if (numberOfCarts > 0) {
                        navigate("/carts/order");
                      }
                    }}
                  />
                </li>
                {user && (
                  <li>
                    <FontAwesomeIcon
                      icon={faUser}
                      onClick={() => {
                        navigate("/profile");
                      }}
                    />
                  </li>
                )}

                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/">{user?.role == "Admin" ? "Admin" : "Home"}</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  );
};

export default Header;
