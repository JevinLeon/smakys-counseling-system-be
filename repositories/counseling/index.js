const prisma = require("../../prisma");

exports.getCounselings = async () => {
  const counselings = await prisma.counselings.findMany({
    include: {
      Users: true,
    },
  });

  return counselings;
};

exports.getCounselingById = async (id) => {
  const selectedCounseling = await prisma.counselings.findUnique({
    where: { id },
    include: {
      Users: true,
    },
  });

  if (selectedCounseling) {
    return selectedCounseling;
  }

  throw new Error("Counseling not found!");
};

exports.addCounseling = async (payload) => {
  const newCounseling = await prisma.counselings.create({
    data: { ...payload },
  });
  return newCounseling;
};

exports.updateCounseling = async (id, payload) => {
  const selectedCounseling = await prisma.counselings.findUnique({
    where: { id },
  });

  if (selectedCounseling) {
    const updatedCounseling = await prisma.counselings.update({
      where: { id },
      data: { ...payload },
    });
    return updatedCounseling;
  }
  throw new Error("Counseling not found!");
};

exports.deleteCounseling = async (id) => {
  const selectedCounseling = await prisma.counselings.findUnique({
    where: { id },
  });
  if (selectedCounseling) {
    const deletedCounseling = await prisma.counselings.delete({
      where: { id },
    });
    return deletedCounseling;
  }

  throw new Error("Counseling not found!");
};
