import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { toast, ToastContainer } from "react-toastify";
const SignIn = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [forgotPassword, setforgotPassword] = useState(false);
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    userName: "",
    gymName: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const handleLogin = async () => {
    // sessionStorage.setItem("isLogin", true);

    await axios
      .post("http://localhost:4000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("gymName", response.data.gym.gymName);
        localStorage.setItem("gymPic", response.data.gym.profilePic);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("token", response.data.token);

        navigate("/Dashboard");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        toast.error(errorMessage);
      });
  };

  const handleClose = () => {
    setforgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  const handleRegister = async () => {
    await axios
      .post("http://localhost:4000/auth/register", inputField)
      .then((resp) => {
        const successMsg = resp.data.message;
        toast.success(successMsg);
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form className="w-full max-w-xs sm:max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            value={loginField.userName}
            onChange={(event) => {
              handleOnChange(event, "userName");
            }}
            type="email"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            value={loginField.password}
            onChange={(event) => {
              handleOnChange(event, "password");
            }}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            handleLogin();
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <div className="mb-4 text-right">
          <button
            type="button"
            onClick={() => handleClose()}
            className="text-sm text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          onClick={() => handleRegister()}
        >
          Sign Up
        </button> */}
      </form>
      {forgotPassword && (
        <Modal
          header="Forgot Password?"
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      )}

      <ToastContainer />
    </div>
  );
};
export default SignIn;
