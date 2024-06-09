const prisma = require("../../prisma");

exports.getClasses = async () => {
  const classes = await prisma.classes.findMany({
    include: {
      Students: true,
    },
  });

  return classes;
};

exports.getClassById = async (id) => {
  const selectedClass = await prisma.classes.findUnique({
    where: { id },
    include: {
      Students: true,
    },
  });

  if (selectedClass) {
    return selectedClass;
  }

  throw new Error("Class not found!");
};

exports.addClass = async (payload) => {
  const newClass = await prisma.classes.create({ data: { ...payload } });
  return newClass;
};

exports.updateClass = async (id, payload) => {
  const selectedClass = await prisma.classes.findUnique({ where: { id } });

  if (selectedClass) {
    const updatedClass = await prisma.classes.update({
      where: { id },
      data: { ...payload },
    });
    return updatedClass;
  }
  throw new Error("Class not found!");
};

exports.deleteClass = async (id) => {
  const selectedClass = await prisma.classes.findUnique({ where: { id } });
  if (selectedClass) {
    const deletedClass = await prisma.classes.delete({ where: { id } });
    return deletedClass;
  }

  throw new Error("Class not found!");
};
