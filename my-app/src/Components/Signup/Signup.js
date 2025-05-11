import React, { useState } from "react";
import Modal from "../Modal/Modal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [forgotPassword, setforgotPassword] = useState(false);
  const [loaderImage, setloaderImage] = useState(false);
  const [inputField, setInputField] = useState({
    userName: "",
    gymName: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const handleClose = () => {
    setforgotPassword((prev) => !prev);
  };
  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setloaderImage(true);
    console.log("image uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj9lc2kfv/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setloaderImage(false);
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
    } catch (err) {
      console.log(err);
      setloaderImage(false);
    }
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
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form className="w-full max-w-xs sm:max-w-sm">
        {/* Full Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            UserName
          </label>
          <input
            value={inputField.fullName}
            onChange={(event) => {
              handleOnChange(event, "userName");
            }}
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        {/* Gym Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Gym Name
          </label>
          <input
            value={inputField.gymName}
            onChange={(event) => {
              handleOnChange(event, "gymName");
            }}
            type="text"
            placeholder="Enter your gym name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            value={inputField.email}
            onChange={(event) => {
              handleOnChange(event, "email");
            }}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            value={inputField.password}
            onChange={(event) => {
              handleOnChange(event, "password");
            }}
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        {/* Profile Picture Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={(event) => {
              uploadImage(event);
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500"
          />
          {loaderImage && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        {/* Forgot Password Link */}
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
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          onClick={() => handleRegister()}
        >
          Sign Up
        </button>
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

export default SignUp;
