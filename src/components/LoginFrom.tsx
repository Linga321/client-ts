import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { loginUser, authUser } from "../redux/reducers/userReducer";
import { Input } from "./Input";

function LoginForm(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [message, setMassage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validateInput = email ==="" || password ===""
    if (!validateInput) {
      //const hashedPassword = bcrypt.hashSync(password, process.env.SECRECT_KEY)
      const result = await dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
      props.setLoading(true);
      setTimeout(async function () {
        if (result.payload?.token) {
          const userInfo = await dispatch(authUser(result.payload?.token));
          if (userInfo.payload?._id) {
            navigate(`/`);
          } else {
            localStorage.removeItem("token");
            props.setErrorMeg(userInfo.payload?.message);
          }
        } else {
          props.setErrorMeg("Email or Password incorrect");
        }
        props.setLoading(false);
      }, 2500);
    }
  };

  return (
    <>
      <h2 className="title">Welcome to Shop(^V^)</h2>
      <form className="loginform">
        <label>Email</label>
        <Input 
          type="email" 
          placeholder="Enter your email"
          inputValue={email} 
          setInputValue={setEmail} 
          name="email"
          error={message}
          />
        <label> Password</label>
        <Input
          type="password"
          placeholder="********"
          inputValue={password}
          setInputValue={setPassword}
          name="password"
          error={message}
        />
        <>{message && <span className="error-message">{""}</span>}</>
        <input type="submit" onClick={handleSubmit} value="Login" />
      </form>
    </>
  );
}

export default LoginForm;
