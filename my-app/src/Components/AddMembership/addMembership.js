import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddMembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({
    months: "",
    price: "",
  });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/plans/get-membership",
        {
          withCredentials: true,
        }
      );
      setMembership(res.data.membership);
      toast.success(`${res.data.membership.length} Memberships Fetched`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleAddMembership = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/plans/add-membership",
        inputField,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  return (
    <div className="text-black px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {membership.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gradient-to-r from-green-500 to-blue-700 w-full text-center shadow-md"
          >
            <div>{item.months} Month Membership</div>
            <div>Rs. {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="my-10 border-gray-400" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4">
        <input
          value={inputField.months}
          onChange={(e) => handleOnChange(e, "months")}
          type="number"
          className="border border-gray-400 rounded-lg text-lg px-4 py-2 w-full sm:w-1/3"
          placeholder="Add number of months"
        />
        <input
          value={inputField.price}
          onChange={(e) => handleOnChange(e, "price")}
          type="number"
          className="border border-gray-400 rounded-lg text-lg px-4 py-2 w-full sm:w-1/3"
          placeholder="Add price"
        />
        <button
          onClick={handleAddMembership}
          className="text-white bg-slate-900 px-6 py-2 rounded-xl hover:bg-gradient-to-r from-green-500 to-blue-700 transition-all"
        >
          Add +
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddMembership;
