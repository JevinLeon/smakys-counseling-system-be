const classRepo = require("../../repositories/class");

exports.getClasses = async () => {
  const data = await classRepo.getClasses();
  return data;
};

exports.getClassById = async (id) => {
  const data = await classRepo.getClassById(id);
  return data;
};

exports.addClass = async (payload) => {
  const data = await classRepo.addClass(payload);
  return data;
};

exports.updateClass = async (id, payload) => {
  const data = await classRepo.updateClass(id, payload);
  return data;
};

exports.deleteClass = async (id) => {
  const data = await classRepo.deleteClass(id);
  return data;
};
