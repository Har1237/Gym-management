import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

const MemberCard = ({ item }) => {
  return (
    <Link
      to={`/member/${item?._id}`}
      className="bg-white rounded-xl p-4 shadow-md hover:bg-gradient-to-r from-green-500 to-blue-700 hover:text-white transition-all duration-300 cursor-pointer 
                 w-full max-w-xs mx-auto sm:mx-0 sm:w-72 md:w-80"
    >
      <div className="relative w-24 h-24 mx-auto border-2 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src={item?.profilePic}
          alt="Profile Pic"
          className="w-full h-full object-cover"
        />
        <CircleIcon
          className="absolute top-1 left-1"
          sx={{
            color: item?.status === "Active" ? "greenyellow" : "red",
            fontSize: "17px",
          }}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-base md:text-lg font-semibold font-sans">
          Name: {item?.name}
        </p>
        <p className="text-base md:text-lg font-semibold font-sans mt-1">
          Mobile: {item?.mobileNo}
        </p>
        <p className="text-base md:text-lg font-semibold font-sans mt-1">
          Address: {item?.address}
        </p>
      </div>
    </Link>
  );
};

export default MemberCard;
