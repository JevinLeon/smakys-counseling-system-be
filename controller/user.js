const userServices = require("../services/user");

exports.getUsers = async (req, res, next) => {
  try {
    const data = await userServices.getUsers();
    res.status(200).json({
      data,
      message: "Users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await userServices.getUserById(id);

    res.status(200).json({
      data,
      message: `User with id ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const newUser = req?.body;
    let { name, username, role, password } = newUser;

    if (!name || name == "") {
      return next({
        statusCode: 500,
        message: "Name is required",
      });
    }
    if (!username || username == "") {
      return next({
        statusCode: 500,
        message: "Username is required",
      });
    }
    if (!role || role == "") {
      return next({
        statusCode: 500,
        message: "Role is required",
      });
    }
    if (!password || password == "") {
      return next({
        statusCode: 500,
        message: "Password is required",
      });
    }

    const data = await userServices.addUser(newUser);
    res.status(201).json({
      data,
      message: "User added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const selectedUser = req?.body;
    let { name, username, role, password } = selectedUser;

    if (!name || name == "") {
      return next({
        statusCode: 500,
        message: "Name is required",
      });
    }
    if (!username || username == "") {
      return next({
        statusCode: 500,
        message: "Username is required",
      });
    }
    if (!role || role == "") {
      return next({
        statusCode: 500,
        message: "Role is required",
      });
    }
    if (!password || password == "") {
      return next({
        statusCode: 500,
        message: "Password is required",
      });
    }

    const data = await userServices.updateUser(id, selectedUser);
    res.status(201).json({
      data,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await userServices.deleteUser(id);
    res
      .status(200)
      .json({ data, message: `User with id ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
