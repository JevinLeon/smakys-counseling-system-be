const counselingLogRepo = require("../../repositories/counseling-log");

exports.getCounselingLogs = async () => {
  const data = await counselingLogRepo.getCounselingLogs();
  return data;
};

exports.addCounselingLog = async (payload) => {
  const data = await counselingLogRepo.addCounselingLog(payload);
  return data;
};
