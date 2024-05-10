const userRepo = require("../../repositories/user");

exports.getUsers = async () => {
  const data = await userRepo.getUsers();
  return data;
};
