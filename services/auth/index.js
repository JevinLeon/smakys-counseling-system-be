const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepo = require("../../repositories/user");

exports.login = async (username, password) => {
  const user = await userRepo.getUserByUsername(username);
  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);
  delete user?.password;

  if (isPasswordvalid) {
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    return { user, token };
  }

  throw new Error("Wrong credentials");
};

exports.profile = async (id) => {
  const user = await userRepo.getUserById(id);

  if (!user) {
    throw new Error("User not found!");
  }

  // if (user?.dataValues?.password) {
  //   delete user.dataValues.password;
  // } else {
  //   delete user?.password;
  // }

  return user;
};

exports.changePassword = async (id, payload) => {
  const user = await userRepo.getUserById(id);

  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordValid = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Wrong password!");
  }

  const newUserPassword = await bcrypt.hashSync(payload.newPassword, 10);

  const updatedUser = await userRepo.updateUser(id, {
    ...user,
    password: newUserPassword,
  });

  // if (updatedUser?.dataValues?.password) {
  //   delete updatedUser.dataValues.password;
  // } else {
  //   delete updatedUser?.password;
  // }
  return updatedUser;
};
