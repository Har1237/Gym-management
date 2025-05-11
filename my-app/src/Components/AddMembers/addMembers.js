import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from "react-toastify";

const AddMembership = () => {
  const [loaderImage, setloaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "/images/gym2.jpg",
    joiningdate: "",
  });

  const handleRegisterButton = async () => {
    try {
      await axios.post(
        "http://localhost:4000/members/register-member",
        inputField,
        {
          withCredentials: true,
        }
      );
      toast.success("Added Successfully");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Something wrong happened!!");
    }
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setloaderImage(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj9lc2kfv/image/upload",
        data
      );
      setInputField({ ...inputField, profilePic: response.data.url });
    } catch (err) {
      console.log(err);
    } finally {
      setloaderImage(false);
    }
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/plans/get-membership",
        {
          withCredentials: true,
        }
      );
      const memberships = res.data.membership;
      setMembershipList(memberships);
      if (memberships.length === 0) {
        toast.error("No any membership added yet", { className: "text-lg" });
      } else {
        const first = memberships[0]._id;
        setSelectedOption(first);
        setInputField({ ...inputField, membership: first });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something gone wrong!!");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  return (
    <div className="text-black px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          type="text"
          className="border border-slate-400 rounded-md px-4 py-2 h-12 w-full"
          placeholder="Name of Joinee"
        />
        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          type="number"
          className="border border-slate-400 rounded-md px-4 py-2 h-12 w-full"
          placeholder="Mobile number"
        />
        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          type="text"
          className="border border-slate-400 rounded-md px-4 py-2 h-12 w-full"
          placeholder="Enter Address"
        />
        <input
          value={inputField.joiningdate}
          onChange={(e) => handleOnChange(e, "joiningdate")}
          type="date"
          className="border border-slate-400 rounded-md px-4 py-2 h-12 w-full"
        />
        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border border-slate-400 rounded-md px-4 py-2 h-12 w-full"
        >
          {membershipList.map((item, index) => (
            <option key={index} value={item._id}>
              {item.months} Months Membership
            </option>
          ))}
        </select>

        <input type="file" onChange={uploadImage} className="w-full text-sm" />

        <div className="flex items-center gap-4">
          <div className="w-16 h-16">
            <img
              src={inputField.profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {loaderImage && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        <button
          onClick={handleRegisterButton}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-gradient-to-r from-green-500 to-blue-700 w-32"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembership;
