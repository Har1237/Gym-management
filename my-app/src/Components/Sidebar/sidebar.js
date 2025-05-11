import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning 🌞");
    else if (hour < 18) setGreeting("Good Afternoon ☀️");
    else if (hour < 21) setGreeting("Good Evening 🌅");
    else setGreeting("Good Night 🌙");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    greetingMessage();
  }, []);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex justify-between items-center bg-slate-900 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="text-lg font-bold">
          {localStorage.getItem("gymName") || "Unique Fitness"}
        </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-screen w-64 bg-slate-900 text-white p-5 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="text-center text-2xl font-bold mb-6">
          {localStorage.getItem("gymName") || "Unique Fitness"}
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2">
            <img
              className="w-full h-full object-cover"
              src={localStorage.getItem("gymPic")}
              alt="Profile"
            />
          </div>
          <div>
            <div className="text-sm">{greeting}</div>
            <div className="text-sm font-semibold">admin</div>
          </div>
        </div>

        <hr className="border-gray-700 mb-4" />

        {/* Navigation Links */}
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-2 rounded-xl text-lg font-semibold transition-all ${
              location.pathname === "/dashboard"
                ? "bg-gradient-to-r from-green-500 to-blue-700 text-black border-2"
                : "bg-slate-700 hover:bg-gradient-to-r from-green-500 to-blue-700 hover:text-black"
            }`}
          >
            <HomeIcon />
            Dashboard
          </Link>

          <Link
            to="/member"
            className={`flex items-center gap-3 p-2 rounded-xl text-lg font-semibold transition-all ${
              location.pathname === "/member"
                ? "bg-gradient-to-r from-green-500 to-blue-700 text-black border-2"
                : "bg-slate-700 hover:bg-gradient-to-r from-green-500 to-blue-700 hover:text-black"
            }`}
          >
            <PeopleIcon />
            Members
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-2 rounded-xl text-lg font-semibold bg-slate-700 hover:bg-gradient-to-r from-green-500 to-blue-700 hover:text-black"
          >
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </div>

      {/* Padding for mobile view to avoid content under top bar */}
      <div className="md:hidden pt-[70px]" />
    </>
  );
};

export default Sidebar;
