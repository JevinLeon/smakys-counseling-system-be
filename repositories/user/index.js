const bcrypt = require("bcrypt");
const { User } = require("../../models");

exports.getUsers = async () => {
  // const users = [
  //   { name: "user1", role: "admin", username: "user1", password: "password" },
  // ];

  const users = await User.findAll();

  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });

  if (user) {
    return user;
  }

  throw new Error("User not found!");
};

exports.addUser = async (payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);

  const newUser = await User.create({ ...payload });
  return newUser;
};

exports.updateUser = async (id, payload) => {
  const user = await User.findOne({ where: { id } });

  if (user) {
    const updatedUser = await user.update({ ...payload });
    return updatedUser;
  }
  throw new Error("User not found!");
};

exports.deleteUser = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (user) {
    const deletedUser = await user.destroy();
    return deletedUser;
  }

  throw new Error("User not found!");
};
