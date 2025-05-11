const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000; // Combined declaration

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Database connection
require("./DBConn/conn");

// Route imports (updated paths)
const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");
const MembersRoutes = require("./Routes/members");

// Routes
app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MembersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
