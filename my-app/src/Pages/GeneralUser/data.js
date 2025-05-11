import axios from "axios";

// ✅ BASE_URL set to your backend URL
// const BASE_URL = "http://localhost:4000";

const getMonthlyJoined = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/members/monthly-member",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
    throw error;
  }
};

const threeDayExpire = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/members/within-3-days-expiring",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
const expiringWithinFourToSevenDays = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/members/within-4-7-days-expiring",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
const expiredMember = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/members/expired-member",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
const inactiveMember = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/members/inactive-member",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
export {
  getMonthlyJoined,
  threeDayExpire,
  expiringWithinFourToSevenDays,
  expiredMember,
  inactiveMember,
};
