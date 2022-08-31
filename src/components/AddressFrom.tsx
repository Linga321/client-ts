import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import {
  createUserAddress,
  deleteUserAddress,
} from "../redux/reducers/userReducer";

/**
 * This is an address form
 * @param props.setLoading cantains loading state when user submit loader will appear
 * @param props.address cantains address information for edit
 * @returns AddressForm
 * @handleSubmit is a function for createing or modify the address for the user
 */

function AddressForm(props: any) {
  const address = props?.address;
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [city, seCity] = useState("");
  const [country, setCountry] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [errorMeg, setErrorMeg] = useState("");
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.authRedu.userAuth);

  
  useEffect(() => {
    setStreet(address?.userAddress ? address.userAddress?.street : "");
    setPostal(address?.userAddress ? address.userAddress?.postal : "");
    seCity(address?.userAddress ? address.userAddress?.city : "");
    setCountry(address?.userAddress ? address.userAddress?.country : "");
    setPlaceName(address?.place ? address?.place : "");
  }, [address]);

  const handleSubmit = async () => {
    const validateAddress =
      street === "" || postal === "" || city === "" || country === "";
    if (!validateAddress) {
      props.setLoading(true);
      const newAddress = {
        address: {
          street: street,
          postal: postal,
          city: city,
          country: country,
        },
        place: placeName,
      };
      if (address?.userAddress) {
       
        await dispatch(
          deleteUserAddress({
            newAddress,
            userId: auth?._id,
            addressId: props?.addressId,
          })
        );
        setTimeout(function () {
          props.setLoading(false);
        }, 2500);
      } else {
        const result = await dispatch(createUserAddress({ newAddress, userId: auth?._id }));
       
        if (result.payload?.message) {
          props.setErrorMeg(result.payload.message as string)
        } 
        setTimeout(function () {
          props.setLoading(false);
        }, 2500);
      }
    }
  };
console.log(address)
  return (
    <>
 
      <form className="Registrationfrom">
        <label>Street Name</label>
        <input
          type="text"
          placeholder="katu 7 A.."
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <label>Postal Code</label>
        <input
          type="text"
          placeholder="00280.."
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          placeholder="Helsinki"
          value={city}
          onChange={(e) => seCity(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          value={country}
          placeholder="Finland"
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Name the address</label>
        <input
          type="text"
          placeholder="Home/ Office.."
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
           {errorMeg && (
            <span className="error-message">
              {errorMeg}
            </span>
          )}
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          value={address?.userAddress ? "update address": "Add new Address" }
        />
      </form>
    </>
  );
}

export default AddressForm;
