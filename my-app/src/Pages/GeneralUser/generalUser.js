import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard/memberCard";
import {
  getMonthlyJoined,
  threeDayExpire,
  expiringWithinFourToSevenDays,
  expiredMember,
  inactiveMember,
} from "./data";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    setLoading(true);
    setError(null);
    try {
      const functionMapping = {
        monthlyJoined: {
          header: "Monthly Joined Members",
          fetchData: getMonthlyJoined,
        },
        threeDayExpire: {
          header: "Expiring In 3 Days Members",
          fetchData: threeDayExpire,
        },
        fourToSevenDaysExpire: {
          header: "Expiring In 4-7 Days Members",
          fetchData: expiringWithinFourToSevenDays,
        },
        expired: {
          header: "Expired Members",
          fetchData: expiredMember,
        },
        inactiveMembers: {
          header: "Inactive Members",
          fetchData: inactiveMember,
        },
      };

      if (functionMapping[func]) {
        setHeader(functionMapping[func].header);
        const response = await functionMapping[func].fetchData();
        setData(response.member);
      } else {
        setError("Invalid function type");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-white overflow-x-hidden text-black flex flex-col items-center px-4 sm:px-8 py-6">
      {/* Unique Fitness Header - Stays exactly as before */}
      <div className="hidden sm:block w-full max-w-7xl bg-slate-900 text-white rounded-lg p-3 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Unique Fitness</h1>
      </div>

      {/* Back Button - Now placed below with proper spacing */}
      <div className="w-full max-w-7xl mt-12 flex justify-end">
        <Link
          to="/dashboard"
          className="border-2 px-4 py-1 rounded-2xl bg-slate-900 text-white hover:bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex items-center gap-1"
        >
          <ArrowBackIcon fontSize="small" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Content - Exactly as your original */}
      <div className="w-full max-w-7xl mt-6">
        <div className="text-lg sm:text-xl font-semibold text-slate-900 text-center">
          {header}
        </div>

        {loading && <div className="text-center mt-5">Loading...</div>}
        {error && <div className="text-center mt-5 text-red-500">{error}</div>}

        <div className="mt-6 w-full max-w-7xl bg-slate-100 bg-opacity-50 p-4 sm:p-6 rounded-lg grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(data) && data.length > 0
            ? data.map((item, index) => <MemberCard key={index} item={item} />)
            : !loading && (
                <div className="text-center col-span-full">
                  No members found.
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default GeneralUser;
