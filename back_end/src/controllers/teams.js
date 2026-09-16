const User = require("../models/user");

const getTeams = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select("-password")
      .sort({ department: 1, name: 1 });

    res.status(200).json({
      count: users.length,
      users
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get teams"
    });
  }
};

module.exports = {
  getTeams
};