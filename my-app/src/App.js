import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import Member from "./Pages/Member/member";
import GeneralUser from "./Pages/GeneralUser/generalUser";
import MemberDetail from "./Pages/MemberDetail/memberDetail";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");
    if (isLogedIn) {
      setisLogin(true);
      navigate("/Dashboard");
    } else {
      setisLogin(false);
      navigate("/");
    }
  }, [localStorage.getItem("isLogin")]);
  return (
    <div className="flex">
      {isLogin && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/member" element={<Member />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </div>
  );
}

export default App;
