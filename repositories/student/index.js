const prisma = require("../../prisma");

exports.getStudents = async () => {
  const students = await prisma.students.findMany({
    include: {
      Classes: true,
    },
  });

  return students;
};

exports.getStudentById = async (id) => {
  const selectedStudent = await prisma.students.findUnique({
    where: { id },
    include: {
      Classes: true,
    },
  });

  if (selectedStudent) {
    return selectedStudent;
  }

  throw new Error("Student not found!");
};

exports.addStudent = async (payload) => {
  const newStudent = await prisma.students.create({ data: { ...payload } });
  return newStudent;
};

exports.updateStudent = async (id, payload) => {
  const selectedStudent = await prisma.students.findUnique({ where: { id } });

  if (selectedStudent) {
    const updatedStudent = await prisma.students.update({
      where: { id },
      data: { ...payload },
    });
    return updatedStudent;
  }
  throw new Error("Student not found!");
};

exports.deleteStudent = async (id) => {
  const selectedStudent = await prisma.students.findUnique({ where: { id } });
  if (selectedStudent) {
    const deletedStudent = await prisma.students.delete({ where: { id } });
    return deletedStudent;
  }

  throw new Error("Student not found!");
};

exports.truncate = async () => {
  const data = await prisma.students.deleteMany({});
  // const data = await Student.truncate();
  return data;
};

exports.addManyStudents = async (payload) => {
  const newStudents = await prisma.students.createMany({ data: payload });
  return newStudents;
};
