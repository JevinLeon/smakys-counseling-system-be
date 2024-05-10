const userRepo = require("../../repositories/user");

exports.getUsers = async () => {
  const data = await userRepo.getUsers();
  return data;
};

exports.getUserById = async (id) => {
  const data = await userRepo.getUserById(id);
  return data;
};

exports.addUser = async (payload) => {
  const data = await userRepo.addUser(payload);
  return data;
};

exports.updateUser = async (id, payload) => {
  const data = await userRepo.updateUser(id, payload);
  return data;
};

exports.deleteUser = async (id) => {
  const data = await userRepo.deleteUser(id);
  return data;
};
