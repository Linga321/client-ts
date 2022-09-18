import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import {
  editUser,
} from "../redux/reducers/userReducer";
import { FileUpload } from "./FileUpload";

function ProfileEditForm(props: any) {
  const auth = useSelector((state: RootState) => state.authRedu.userAuth);
  const imageId = auth?.avatar && JSON.parse(JSON.stringify(auth?.avatar));
  const [loading, setLoading] = useState(false);
  const [errorMeg, setErrorMeg] = useState("");
  const [id, setId] = useState(auth ? auth._id : "");
  const [firstName, setFirstName] = useState(auth ? auth.firstName : "");
  const [lastName, setLastName] = useState(auth ? auth.lastName : "");
  const [email, setEmail] = useState(auth ? auth.email : "");
  const [mobile, setMobile] = useState(auth ? auth.phone : "");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMassage] = useState("");
  const [image, setImage] = useState(imageId ? imageId : "");
  const [role, setRole] = useState(auth ? auth.role : "");
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const profileEditValidation =
    lastName == "" ||
    firstName == "" ||
    password == "" ||
    email == "" ||
    mobile == "" ||
    (mobile && mobile?.length > 10) ||
    image == "";

  const updateProfile = async () => {
    if (!profileEditValidation) {
      const editProfileData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        avatar: image,
        phone: mobile,
      };
      const editProfileDataWithPassword = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: newPassword,
        role: role,
        avatar: image,
        phone: mobile,
      };
      setLoading(true);

      const result = await dispatch(
        editUser({
          user:
            newPassword != "" ? editProfileDataWithPassword : editProfileData,
          userId: id,
          password: password,
        })
      );
      setTimeout(async () => {
        setLoading(false);
      }, 500);
      if (result.payload?._id) {
        navigate("/login");
      }
    } else {
      setErrorMeg("Please fill the empty fields");
    }
  };

  return (
    <div className="form-container">
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
        <form className="Registrationfrom">
          <label>Fisrt Name</label>
          <input
            type="text"
            placeholder="Your First name.."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Your Last name.."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mobile number</label>
          <input
            type="number"
            placeholder="Your phone number.."
            value={mobile && mobile.length <= 10 ? Number(mobile) : 0}
            onChange={(e) => setMobile(e.target.value)}
          />
          {auth?.role === "Admin" && (
            <>
              <label> User Type</label>
              <select
                name="selectCategory"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
              </select>
            </>
          )}
          <label> Profile Image</label>
          <FileUpload handleFile={setImage} image={image} />
          <label> New Password (Optional)</label>
          <input
            type="password"
            placeholder="*******"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label> Password</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error-message">{errorMeg}</p>
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              updateProfile();
            }}
            value="Update Profile"
          />
          <input
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            value="Cancell"
          />
        </form>
      )}
      {message && <span className="error-message">{message}</span>}
    </div>
  );
}

export default ProfileEditForm;
