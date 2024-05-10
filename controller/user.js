const userServices = require("../services/user");

exports.getUsers = async (req, res, next) => {
  try {
    const data = await userServices.getUsers();
    res.status(200).json({
      data,
      message: "Users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
