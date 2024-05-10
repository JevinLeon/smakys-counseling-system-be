const classServices = require("../services/class");

exports.getClasses = async (req, res, next) => {
  try {
    const data = await classServices.getClasses();
    res.status(200).json({
      data,
      message: "Classes fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await classServices.getClassById(id);

    res.status(200).json({
      data,
      message: `Class with id ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.addClass = async (req, res, next) => {
  try {
    const newClass = req?.body;

    if (!newClass.name || newClass.name == "") {
      return next({
        statusCode: 500,
        message: "Class name is required",
      });
    }

    const data = await classServices.addClass(newClass);

    res.status(201).json({
      data,
      message: "Class added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const selectedClass = req?.body;

    if (!selectedClass.name || selectedClass.name == "") {
      return next({
        statusCode: 500,
        message: "Class name is required",
      });
    }
    const data = await classServices.updateClass(id, selectedClass);

    res.status(201).json({
      data,
      message: "Class updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await classServices.deleteClass(id);
    res.status(200).json({
      data,
      message: "Class deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
