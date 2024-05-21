const counselingLogServices = require("../services/counseling-log");

exports.getCounselingLogs = async (req, res, next) => {
  try {
    const data = await counselingLogServices.getCounselingLogs();
    res.status(200).json({
      data,
      message: "Counseling logs fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.addCounselingLog = async (req, res, next) => {
  try {
    const newLog = req?.body;

    if (!newLog.activity || newLog.activity == "") {
      return next({
        statusCode: 500,
        message: "Activity is required",
      });
    }

    const data = await counselingLogServices.addCounselingLog(newLog);

    res.status(201).json({
      data,
      message: "Counseling log added successfully",
    });
  } catch (error) {
    next(error);
  }
};
