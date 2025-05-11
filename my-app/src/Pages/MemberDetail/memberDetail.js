import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const MemberDetail = () => {
  const [status, setStatus] = useState(false);
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    setPlanMember(event.target.value);
  };

  const fetchMembership = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/plans/get-membership",
        { withCredentials: true }
      );
      setMembership(response.data.membership);
      setPlanMember(response.data.membership[0]._id);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while getting plans!");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/members/get-member/${id}`,
        { withCredentials: true }
      );
      setData(response.data.member);
      setStatus(response.data.member.status);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleSwitchBtn = async () => {
    const newStatus = status === "Active" ? "Pending" : "Active";
    try {
      await axios.post(
        `http://localhost:4000/members/change-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success("Status changed successfully");
      setStatus(newStatus);
    } catch (err) {
      toast.error("Failed to change status");
      console.error(err);
    }
  };

  const isDatePast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  return (
    <div className="w-3/4 text-black p-5">
      {/* Go Back Button */}
      <div
        onClick={() => navigate(-1)}
        className="border-2 w-fit text-lg font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer 
             mt-12 sm:mt-0"
      >
        <ArrowBackIcon /> Go Back
      </div>

      {/* Member Details */}
      <div className="mt-10 p-2">
        <div className="h-fit w-full flex flex-col sm:flex-row">
          {/* Profile Picture */}
          <div className="w-full sm:w-1/5 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <img
              className="w-28 h-28 sm:w-1/4 object-cover rounded-full"
              src={data?.profilePic}
              alt="Profile"
            />
          </div>

          {/* Member Info */}
          <div className="w-full sm:w-2/3 text-base sm:text-xl p-3 sm:p-5">
            <div className="mt-1 mb-2 font-semibold">Name: {data?.name}</div>
            <div className="mt-1 mb-2 font-semibold">
              Address: {data?.address}
            </div>
            <div className="mt-1 mb-2 font-semibold">
              Mobile: {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 font-semibold">
              Joined Date:{" "}
              {data?.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 font-semibold">Next Bill Date:</div>

            {/* Status Switch */}
            <div className="mt-1 mb-2 flex gap-4 items-center font-semibold">
              Status:{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchBtn}
                sx={{ fontSize: "12px" }}
              />
            </div>

            {/* Renew Button */}
            {isDatePast(data?.nextBillDate) && (
              <div
                onClick={() => setRenew((prev) => !prev)}
                className={`mt-1 rounded-lg p-1 border-2 border-slate-900 text-center ${
                  renew && status === "Active"
                    ? "text-white bg-gradient-to-r from-green-500 to-blue-700"
                    : ""
                } w-full sm:w-1/2 cursor-pointer`}
              >
                Renew
              </div>
            )}

            {/* Membership Renewal Form */}
            {renew && status === "Active" && (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 w-full sm:w-[80%]">
                <div className="w-full">
                  <div className="my-5">
                    <div className="text-lg">Membership</div>
                    <select
                      value={planMember}
                      onChange={handleOnChangeSelect}
                      className="w-full border-2 p-2 rounded-lg text-lg"
                    >
                      {membership.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.months} Months Membership
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 rounded-lg text-lg p-1 border-2 border-slate-900 text-center w-full sm:w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-green-500 to-blue-700">
                      Save
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
