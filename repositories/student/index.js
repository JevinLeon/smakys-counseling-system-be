const { Student, Class } = require("../../models");

exports.getStudents = async () => {
  const students = await Student.findAll({
    include: {
      model: Class,
    },
  });

  return students;
};

exports.getStudentById = async (id) => {
  const selectedStudent = await Student.findOne({
    where: { id },
    include: {
      model: Class,
    },
  });

  if (selectedStudent) {
    return selectedStudent;
  }

  throw new Error("Student not found!");
};

exports.addStudent = async (payload) => {
  const newStudent = await Student.create({ ...payload });
  return newStudent;
};

exports.updateStudent = async (id, payload) => {
  const selectedStudent = await Student.findOne({ where: { id } });

  if (selectedStudent) {
    const updatedStudent = await selectedStudent.update({ ...payload });
    return updatedStudent;
  }
  throw new Error("Student not found!");
};

exports.deleteStudent = async (id) => {
  const selectedStudent = await Student.findOne({ where: { id } });
  if (selectedStudent) {
    const deletedStudent = await selectedStudent.destroy();
    return deletedStudent;
  }

  throw new Error("Student not found!");
};

exports.truncate = async () => {
  const data = await Student.destroy({
    where: {},
    truncate: true,
    paranoid: false,
  });
  // const data = await Student.truncate();
  return data;
};

exports.addManyStudents = async (payload) => {
  const newStudents = await Student.bulkCreate(payload);
  return newStudents;
};
