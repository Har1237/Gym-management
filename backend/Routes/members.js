const express = require("express");
const router = express.Router();
const MemberController = require("../Controllers/members");
const auth = require("./Auth/auth");

router.get("/all-member", auth, MemberController.getAllMembers);
router.post("/register-member", auth, MemberController.registerMember);

router.get("/searched-members", auth, MemberController.searchMember);
router.get("/monthly-member", auth, MemberController.monthlyMember);
router.get(
  "/within-3-days-expiring",
  auth,
  MemberController.expiringWithinThreeDays
);
router.get(
  "/within-4-7-days-expiring",
  auth,
  MemberController.expiringWithinFourToSevenDays
);
router.get("/expired-member", auth, MemberController.expiredMember);
router.get("/inactive-member", auth, MemberController.inactiveMember);
router.get("/get-member/:id", auth, MemberController.getMemberDetail);
router.post("/change-status/:id", auth, MemberController.changeStatus);
router.put("/update-member-plan/:id", auth, MemberController.updateMemberPlan);
module.exports = router;
