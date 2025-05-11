const Member = require("../Modals/member");
const Membership = require("../Modals/membership");
exports.getAllMembers = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    // console.log(skip, limit);
    const members = await Member.find({ gym: req.gym._id });
    const totalMember = members.length;
    const limitedMembers = await Member.find({ gym: req.gym._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: members.length
        ? "Fetched Members Successfully"
        : "No any Member Registered yet",
      members: limitedMembers,
      totalMember: totalMember,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

function addMonthsToDate(months, joiningDate) {
  //get current year,monnth and day
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  //calculate the new month and year
  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  //CALCULATE THE CURRENT FUTURE MONTH
  const adjustMonth = futureMonth % 12;

  //set date to first of the future month
  const futureDate = new Date(futureYear, adjustMonth, 1);

  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustMonth + 1,
    0
  ).getDate();

  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

  futureDate.setDate(adjustedDay);

  return futureDate;
}

exports.registerMember = async (req, res) => {
  try {
    const { name, mobileNo, address, membership, profilePic, joiningDate } =
      req.body;
    const member = await Member.findOne({ gym: req.gym._id, mobileNo });
    if (member) {
      return res
        .status(409)
        .json({ error: "Already registered with this Mobile No." });
    }
    const memberShip = await Membership.findOne({
      _id: membership,
      gym: req.gym._id,
    });
    const membershipMonths = memberShip.months;
    if (memberShip) {
      let jngDate = new Date(joiningDate);
      const nextBillDate = addMonthsToDate(membershipMonths, jngDate);
      let newmember = new Member({
        name,
        mobileNo,
        address,
        membership,
        gym: req.gym._id,
        profilePic,
        nextBillDate,
      });
      await newmember.save();
      res
        .status(200)
        .json({ message: "Member Registered Successfully", newmember });
    } else {
      return res.status(409).json({ error: "No such Membership are there." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const member = await Member.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { mobileNo: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No Such Member Registered yet",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.monthlyMember = async (req, res) => {
  try {
    const now = new Date();

    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const member = await Member.find({
      gym: req.gym._id,
      createdAt: {
        $gte: startMonth,
        $lte: endMonth,
      },
    }).sort({ createdAt: -1 });
    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No such Member registered yet",
      member: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.expiringWithinThreeDays = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);
    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDays,
      },
    });
    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No such Member plan expiring within three days!!",
      member: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.expiringWithinFourToSevenDays = async (req, res) => {
  try {
    const today = new Date();
    const nextFourDays = new Date();
    nextFourDays.setDate(today.getDate() + 4);
    const nextSevenDays = new Date();
    nextSevenDays.setDate(today.getDate() + 7);

    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: nextFourDays, // greater than equal to 4 days later from today
        $lte: nextSevenDays, // greater than equal to 7 days later from today
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No such Member plan expiring within 4-7 days!!",
      member: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.expiredMember = async (req, res) => {
  try {
    const today = new Date();
    const member = await Member.find({
      gym: req.gym._id,
      status: "Active",
      nextBillDate: {
        $lt: today, // less than today
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No Member's plan has been expired!!",
      member: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.inactiveMember = async (req, res) => {
  try {
    const member = await Member.find({
      gym: req.gym._id,
      status: "Pending",
    });
    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No Member's plan has been inactive yet!!",
      member: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getMemberDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({ error: "No such Member" });
    }
    res.status(200).json({
      message: "Member Data fetched",
      member: member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({ error: "No such Member" });
    }
    member.status = status;
    member.save();
    res.status(200).json({
      message: "Status change successfully",
      member: member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;
    const { id } = req.params;

    const memberShip = await Membership.findOne({
      gym: req.gym._id,
      _id: membership,
    });
    if (memberShip) {
      let getMonth = memberShip.months;
      let today = new Date();
      let nextBillDate = addMonthsToDate(getMonth, today);
      const member = await Member.findOne({ gym: req.gym._id, _id: id });
      if (!member) {
        return res.status(409).json({ error: "No such member are true" });
      }
      member.nextBillDate = nextBillDate;
      member.lastPayment = today;
      await member.save();
      res.status(200).json({ error: "Member renewed successfully", member });
    } else {
      return res.status(409).json({ error: "No such membership are true" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
