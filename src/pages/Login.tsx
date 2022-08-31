import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import LoginForm from "../components/LoginFrom";
import RegisterForm from "../components/RegisterFrom";

const Login = () => {
  const [form, setForm] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [errorMeg, setErrorMeg] = useState('');

  return (
    <>
      {loading ? (
        <div className="loading-container" style={{ height: "100vh" }} aria-describedby="Login page">
          <div className="loading">
           <img src={require("../assets/pictures/loading2.gif")} alt="loading" />
          </div>
        </div>
      ) : (
        <div
          className="form-container"
          aria-describedby="Login and regisration page"
        >
          {errorMeg && <p className={(errorMeg !== "success"? "success" : "error") +"-message-popup"}>{errorMeg}</p>}
          <div className="form">
            <div>
              {form === "Login" ? (
                <LoginForm setLoading={setLoading} setErrorMeg={setErrorMeg}/>
              ) : (
                <RegisterForm formswitch={setForm} setLoading={setLoading} setErrorMeg={setErrorMeg}/>
              )}
            </div>
            <div className="btnswitch">
              {form !== "Login" ? (
                <input
                  type="button"
                  className={form === "Login" ? "active-form" : ""}
                  onClick={(e) => {
                    setForm("Login");
                  }}
                  value="Already Have a account?"
                />
              ) : (
                <input
                  type="button"
                  className={form === "Login" ? "" : "active-form"}
                  onClick={() => {
                    setForm("Register");
                  }}
                  value="Register new account !"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
