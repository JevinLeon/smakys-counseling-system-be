const { Class, Student } = require("../../models");

exports.getClasses = async () => {
  const classes = await Class.findAll({
    include: {
      model: Student,
    },
  });

  return classes;
};

exports.getClassById = async (id) => {
  const selectedClass = await Class.findOne({
    where: { id },
    include: {
      model: Student,
    },
  });

  if (selectedClass) {
    return selectedClass;
  }

  throw new Error("Class not found!");
};

exports.addClass = async (payload) => {
  const newClass = await Class.create({ ...payload });
  return newClass;
};

exports.updateClass = async (id, payload) => {
  const selectedClass = await Class.findOne({ where: { id } });

  if (selectedClass) {
    const updatedClass = await selectedClass.update({ ...payload });
    return updatedClass;
  }
  throw new Error("Class not found!");
};

exports.deleteClass = async (id) => {
  const selectedClass = await Class.findOne({ where: { id } });
  if (selectedClass) {
    const deletedClass = await selectedClass.destroy();
    return deletedClass;
  }

  throw new Error("Class not found!");
};
