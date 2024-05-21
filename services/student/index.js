const studentRepo = require("../../repositories/student");

exports.getStudents = async () => {
  const data = await studentRepo.getStudents();
  return data;
};

exports.getStudentById = async (id) => {
  const data = await studentRepo.getStudentById(id);
  return data;
};

exports.addStudent = async (payload) => {
  const data = await studentRepo.addStudent(payload);
  return data;
};

exports.updateStudent = async (id, payload) => {
  const data = await studentRepo.updateStudent(id, payload);
  return data;
};

exports.deleteStudent = async (id) => {
  const data = await studentRepo.deleteStudent(id);
  return data;
};

exports.truncate = async () => {
  const data = await studentRepo.truncate();
  return data;
};

exports.addManyStudents = async (payload) => {
  const data = await studentRepo.addManyStudents(payload);
  return data;
};
