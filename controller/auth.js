const { login, profile, changePassword } = require("../services/auth");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || username == "") {
      return next({
        statusCode: 500,
        message: "Username is required",
      });
    }

    if (!password || password == "") {
      return next({
        statusCode: 500,
        message: "Password is required",
      });
    }

    const data = await login(username, password);

    res.status(200).json({
      data,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const data = await profile(req.user.id);
    res.status(200).json({
      data,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    console.log(req.body);
    const data = await changePassword(req.user.id, {
      currentPassword,
      newPassword,
    });

    res.status(200).json({
      data,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
