import React, { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { registerUser } from "../redux/reducers/userReducer";

function RegisterForm(props: any) {
  const [register, setregister] = useState(false);
  const [errorMeg, setErrorMeg] = useState("");
  const [fisrtName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();

  const validateForm = async () => {
    const validateField =
      fisrtName == "" || lastName == "" || password == "" || email == "";
    if (!validateField) {
      if (password === conformPassword && password.length >= 5) {
        let validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.match(validRegex)) {
          return true;
        } else {
          setErrorMeg("Check your email");
        }
      } else {
        if (password.length < 5) {
          setErrorMeg("Password must be longer than 5 characters");
        } else if (password !== conformPassword) {
          setErrorMeg("Password Not Matched");
        }
        return false;
      }
    } else {
      setErrorMeg("All fields are required");
      return false;
    }
  };
  const submitForm = async () => {
    const validateField = await validateForm();
    if (validateField) {
      props.setLoading(true);
      const result = await dispatch(
        registerUser({
          firstName: fisrtName,
          lastName: lastName,
          email: email,
          password: password,
        })
      );
      setTimeout(function () {
        if (result.payload?._id) {
          props.formswitch("Login");
          props.setErrorMeg("success")
        } else {
          props.setErrorMeg(result.payload?.message)
        }
        props.setLoading(false);
      }, 2500);
    }
  };

  return (
    <>
      <h2 className="title">Welcome to Shop(^V^)</h2>
      <form className="Registrationfrom">
        <label>First Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your first name"
          onChange={(e) => setFisrtName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
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
            submitForm();
            setregister(register ? false : true);
          }}
          value="Register"
        />
      </form>
    </>
  );
}

export default RegisterForm;
