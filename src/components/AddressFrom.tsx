import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { createAddress } from "../redux/reducers/userReducer";

function AddressForm(props: any) {
  const [address, setAdress] = useState(false);
  const [street, setStreet] = useState(String);
  const [postal, setPostal] = useState(String);
  const [city, seCity] = useState(String);
  const [country, setCountry] = useState(String);
  const [placeName, setPlaceName] = useState(String);
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.authRedu.userAuth);

  useEffect(() => {
    const validateAddress =
      street == "" || postal == "" || city == "" || country == "";
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
     dispatch(createAddress({newAddress, userId:auth?._id}));
      setTimeout(function () {
        props.setLoading(false);
      }, 2500);
    }
  }, [address]);

  return (
    <>
      <form className="Registrationfrom">
        <label>Street Name</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="katu 7 A.."
          onChange={(e) => setStreet(e.target.value)}
        />
        <label>Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postal"
          placeholder="00280.."
          onChange={(e) => setPostal(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City name.."
          onChange={(e) => seCity(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="country name.."
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Name the address</label>
        <input
          type="text"
          id="place"
          name="place"
          placeholder="Home/ Office.."
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setAdress(address ? false : true);
          }}
          value="Add new Address"
        />
      </form>
    </>
  );
}

export default AddressForm;
