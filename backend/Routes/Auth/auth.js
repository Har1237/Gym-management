const Gym = require("../../Modals/gym");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" }); // Return here
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.gym = await Gym.findById(decode.gym_id).select("-password");

    next(); // Call next() only if everything succeeds
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" }); // Return here too
  }
};

module.exports = auth;
