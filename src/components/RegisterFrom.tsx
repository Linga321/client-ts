import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { registerUser } from "../redux/reducers/userReducer";

function RegisterForm(props: any) {
  const [register, setregister] = useState(false);
  const [errorMeg, setErrorMeg] = useState(String);
  const [fisrtName, setFisrtName] = useState(String);
  const [lastName, setLastName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [conformPassword, setConfirmPassword] = useState(String);
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.authRedu);

  useEffect(() => {
    const validateField =
      fisrtName == "" || lastName == "" || password == "" || email == "";
    if (!validateField) {
      if (password === conformPassword) {
        props.setLoading(true);
        dispatch(
          registerUser({
            firstName: fisrtName,
            lastName: lastName,
            email: email,
            password: password
          })
        );
        setTimeout(function () {
          if (auth.userAuth) {
            props.formswitch("Login");
          }
          props.setLoading(false);
        }, 4000);
      } else {
        setErrorMeg("Password Not Matched");
      }
    }
  }, [register]);

  return (
    <>
      <h2 className="title">Welcome to Shop(^V^)</h2>
      <form className="Registrationfrom">
        <label>First Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
          onChange={(e) => setFisrtName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="*******"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="*******"
          id="password"
          name="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p className="error-message">{errorMeg}</p>
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setregister(register ? false : true);
          }}
          value="Register"
        />
      </form>

    </>
  );
}

export default RegisterForm;
