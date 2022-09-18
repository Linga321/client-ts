import React, { useState } from "react";

export const Input = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMeg, setErrorMeg] = useState("");
  const ValidateInput = (value: string) => {
    setErrorMeg("");
    if (value !== "") {
      if (props.type === "email") {
        let validRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!value.match(validRegex)) {
          setErrorMeg("Invalid email");
          return false;
        } else {
          return true;
        }
      } else if (props.type === "number") {
        if (
          props.max &&
          props.min &&
          Number(value) < 0 &&
          Number(value) > 100
        ) {
          setErrorMeg(`Range must be Min :${props.min} Max :${props.max}`);
          return false;
        } else {
          return true;
        }
      } else if (props.type === "password") {
        if (value.length < 5) {
          setErrorMeg("Must be longer than 5 characters");
          return false;
        } else {
          if (props.confirmPassword && value !== props.confirmPassword) {
            setErrorMeg("Password Not Matched");
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      if (!props.optional) {
        setErrorMeg("Required Field");
        return false;
      } else {
        return true;
      }
    }
  };
  const handleChange = (value: string) => {
    const validField = ValidateInput(value);
    if (validField) {
      props.setInputValue(value);
    } else {
      props.setInputValue("");
    }
  };
  return (
    <>
      <input
        type={props.type}
        value={inputValue}
        placeholder={props.placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange(e.target.value);
        }}
        onBlur={(e) => handleChange(e.target.value)}
        onFocus={(e) => setErrorMeg("")}
      />
      <span className="error-message">{errorMeg}</span>
    </>
  );
};
