const bcrypt = require("bcrypt");
const prisma = require("../../prisma");

exports.getUsers = async () => {
  const users = await prisma.users.findMany();

  return users;
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });

  if (user) {
    return user;
  }

  throw new Error("User not found!");
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findUnique({
    where: { username },
  });

  if (user) {
    return user;
  }

  throw new Error("User not found!");
};

exports.addUser = async (payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);

  const newUser = await prisma.users.create({ data: { ...payload } });
  return newUser;
};

exports.updateUser = async (id, payload) => {
  const user = await prisma.users.findUnique({ where: { id } });

  if (user) {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: { ...payload },
    });
    return updatedUser;
  }
  throw new Error("User not found!");
};

exports.deleteUser = async (id) => {
  const user = await prisma.users.findUnique({ where: { id } });
  if (user) {
    const deletedUser = await prisma.users.delete({ where: { id } });
    return deletedUser;
  }

  throw new Error("User not found!");
};
