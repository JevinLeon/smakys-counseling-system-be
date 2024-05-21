const { CounselingLog, User, Counseling } = require("../../models");

exports.getCounselingLogs = async () => {
  const counselingLogs = await CounselingLog.findAll({
    include: [
      {
        model: Counseling,
        paranoid: false,
      },
      {
        model: User,
        paranoid: false,
      },
    ],
  });

  return counselingLogs;
};

exports.addCounselingLog = async (payload) => {
  const newCounselingLog = await CounselingLog.create({ ...payload });
  return newCounselingLog;
};
