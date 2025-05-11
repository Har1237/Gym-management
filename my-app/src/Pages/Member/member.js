import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCard from "../../Components/MemberCard/memberCard";
import Modal from "../../Components/Modal/Modal";
import AddMembership from "../../Components/AddMembership/addMembership";
import AddMembers from "../../Components/AddMembers/addMembers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { debounce } from "lodash";

const Member = () => {
  const [addMembership, setAddMembership] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm !== "") {
      setSearchMode(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/members/searched-members?searchTerm=${searchTerm}`,
          { withCredentials: true }
        );
        setData(response.data.members);
      } catch (err) {
        toast.error("Some technical fault occurred!!");
        console.log(err);
      }
    }
  }, 500);

  const fetchData = async (skip, limits) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`,
        { withCredentials: true }
      );
      const totalData = response.data.totalMember;
      setTotalData(totalData);
      setData(response.data.members);

      const extraPage = totalData % limit === 0 ? 0 : 1;
      const totalPage = Math.floor(totalData / limit) + extraPage;
      setNoOfPage(totalPage);

      if (totalData === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (totalData < 10) {
        setStartFrom(0);
        setEndTo(totalData);
      }
    } catch (err) {
      toast.error("Some technical fault occurred!!");
      console.log(err);
    }
  };

  const handleMembership = () => setAddMembership((prev) => !prev);
  const handleMembers = () => setAddMembers((prev) => !prev);

  const handlePrev = () => {
    if (currentPage !== 1) {
      const currPage = currentPage - 1;
      setCurrentPage(currPage);
      const from = (currPage - 1) * 9;
      const to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      const skipVal = skip - 9;
      setSkip(skipVal);
      fetchData(skipVal, 9);
    }
  };

  const handleNext = () => {
    if (currentPage < noOfPage) {
      const currPage = currentPage + 1;
      setCurrentPage(currPage);
      const from = (currPage - 1) * 9;
      let to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      const skipVal = skip + 9;
      setSkip(skipVal);
      fetchData(skipVal, 9);
    }
  };

  return (
    <div className="w-full md:w-3/4 text-black p-4 h-screen flex flex-col overflow-hidden mt-16 md:mt-0">
      {/* Add Buttons */}
      <div className="w-full bg-slate-900 text-white rounded-lg flex justify-between p-3 items-center flex-wrap gap-2">
        <div
          className="border-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-gradient-to-r from-green-500 to-blue-700"
          onClick={handleMembers}
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className="border-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-gradient-to-r from-green-500 to-blue-700"
          onClick={handleMembership}
        >
          Membership <AddIcon />
        </div>
      </div>

      {/* Back Link */}
      <Link
        to="/dashboard"
        className="mt-4 mb-2 flex items-center gap-2 text-blue-600"
      >
        <ArrowBackIcon /> Back to Dashboard
      </Link>

      {/* Search */}
      <div className="w-full sm:w-1/2 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search your name or mobile number"
        />
        <div
          onClick={() => debouncedSearch(search)}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600"
        >
          <SearchIcon />
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 text-lg flex justify-between items-center flex-wrap text-slate-900">
        <div>Total Members</div>
        <div className="flex items-center gap-4">
          <div>
            {startFrom + 1} - {endTo} of {totalData} Members
          </div>
          <div
            className={`border-2 flex w-7 h-7 items-center justify-center cursor-pointer ${
              currentPage === 1
                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                : "hover:bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600"
            }`}
            onClick={handlePrev}
          >
            <ChevronLeftIcon />
          </div>
          <div
            className={`border-2 flex w-7 h-7 items-center justify-center cursor-pointer ${
              currentPage === noOfPage
                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                : "hover:bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600"
            }`}
            onClick={handleNext}
          >
            <ChevronRightIcon />
          </div>
        </div>
      </div>

      {/* Member Cards */}
      <div className="mt-5 bg-white rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 overflow-y-auto flex-1">
        {data.length ? (
          data.map((item, index) => <MemberCard key={index} item={item} />)
        ) : (
          <div>No members found.</div>
        )}
      </div>

      {/* Modals */}
      {addMembership && (
        <Modal
          header="Add Membership"
          handleClose={handleMembership}
          content={<AddMembership handleClose={handleMembership} />}
        />
      )}
      {addMembers && (
        <Modal
          header="Add New Member"
          handleClose={handleMembers}
          content={<AddMembers />}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Member;
