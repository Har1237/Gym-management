import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setotpValidate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contentValue, setcontentValue] = useState("Submit your Email");
  const [inputField, setInputField] = useState({
    email: "",
    // opt: "",
    // newPassword: "",
  });
  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:4000/auth/reset-password/checkOtp", {
        email: inputField.email,
        otp: inputField.otp,
      })
      .then((response) => {
        setotpValidate(true);
        setcontentValue("Enter your new Password");
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Some technical issues while sending otp");
        console.log(err);
        setLoader(false);
      });
  };
  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:4000/auth/reset-password/sendOtp", {
        email: inputField.email,
      })
      .then((response) => {
        setEmailSubmit(true);
        setcontentValue("Submit your OTP");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issues while sending otp");
        console.log(err);
        setLoader(false);
      });
  };
  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Enter your Email
        </label>
        <input
          value={inputField.email}
          onChange={(event) => {
            handleOnChange(event, "email");
          }}
          type="email"
          placeholder="Enter your email"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      {emailSubmit && (
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter your OTP
          </label>
          <input
            value={inputField.otp}
            onChange={(event) => {
              handleOnChange(event, "otp");
            }}
            type="number"
            placeholder="Enter OTP"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      )}
      {otpValidate && (
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter new password
          </label>
          <input
            value={inputField.newPassword}
            onChange={(event) => {
              handleOnChange(event, "newPassword");
            }}
            type="password"
            placeholder="Enter new password"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      )}
      <button
        type="submit"
        onClick={() => handleSubmit()}
        className="w-1/2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        {contentValue}
      </button>
      {loader && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
