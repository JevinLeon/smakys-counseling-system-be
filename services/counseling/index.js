const counselingRepo = require("../../repositories/counseling");

exports.getCounselings = async () => {
  const data = await counselingRepo.getCounselings();
  return data;
};

exports.getCounselingById = async (id) => {
  const data = await counselingRepo.getCounselingById(id);
  return data;
};

exports.addCounseling = async (payload) => {
  const data = await counselingRepo.addCounseling(payload);
  return data;
};

exports.updateCounseling = async (id, payload) => {
  const data = await counselingRepo.updateCounseling(id, payload);
  return data;
};

exports.deleteCounseling = async (id) => {
  const data = await counselingRepo.deleteCounseling(id);
  return data;
};
