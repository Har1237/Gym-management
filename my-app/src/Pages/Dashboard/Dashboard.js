import React, { useEffect, useRef, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [clickMenu, setClickMenu] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (clickMenu && ref.current && !ref.current.contains(e.target)) {
        setClickMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [clickMenu]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  const cardData = [
    {
      to: "/member",
      icon: <PeopleAltIcon sx={{ color: "green", fontSize: 30 }} />,
      title: "Joined Members",
    },
    {
      to: "/specific/monthly",
      onClick: () => handleOnClickMenu("monthlyJoined"),
      icon: <SignalCellularAltIcon sx={{ color: "purple", fontSize: 30 }} />,
      title: "Monthly Joined",
    },
    // {
    //   to: "/specific/expiring-within-3-days",
    //   onClick: () => handleOnClickMenu("threeDaysExpire"),
    //   icon: <AccessAlarmIcon sx={{ color: "blue", fontSize: 30 }} />,
    //   title: "Expiring within 3 days",
    // },
    {
      to: "/specific/expiring-within-4-7-days",
      onClick: () => handleOnClickMenu("fourToSevenDaysExpire"),
      icon: <RunningWithErrorsIcon sx={{ color: "purple", fontSize: 30 }} />,
      title: "Expiring within 4–7 days",
    },
    {
      to: "/specific/expired",
      onClick: () => handleOnClickMenu("expired"),
      icon: <ErrorIcon sx={{ color: "red", fontSize: 30 }} />,
      title: "Expired",
    },
    {
      to: "/specific/inactive-members",
      onClick: () => handleOnClickMenu("inactiveMembers"),
      icon: <ReportIcon sx={{ color: "black", fontSize: 30 }} />,
      title: "Inactive Members",
    },
  ];

  return (
    <div className="w-full md:w-3/4 px-4 py-6 mt-20 sm:mt-16">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-xl gap-5 flex justify-between items-center px-5 py-3 shadow-md fixed top-0 left-0 right-0 z-40">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setClickMenu((prev) => !prev)}
        />
        <img
          src="images/gym2.jpg"
          className="w-9 h-9 rounded-full border-2"
          alt="Gym Logo"
        />
      </div>

      {/* Popup */}
      {clickMenu && (
        <div
          ref={ref}
          className="absolute top-20 left-4 bg-slate-900 text-white rounded-xl p-4 text-sm shadow-lg z-50"
        >
          <div className="mb-1">
            Hi! Welcome to our Gym Management Dashboard 👋
          </div>
          <p>Feel free to ask any query.</p>
        </div>
      )}

      {/* Cards */}
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {cardData.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            onClick={item.onClick}
            className="bg-white border rounded-xl shadow hover:shadow-lg hover:scale-[1.02] hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl" />
            <div className="p-6 flex flex-col items-center justify-center text-center">
              {item.icon}
              <p className="mt-4 font-semibold text-lg">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 p-4 bg-slate-700 text-white rounded-xl text-center text-sm md:text-base">
        Contact the developer for any technical error:{" "}
        <span className="font-semibold">+91 9914973565</span>
      </div>
    </div>
  );
};

export default Dashboard;
