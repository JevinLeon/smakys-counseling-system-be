const prisma = require("../../prisma");

exports.getCounselingLogs = async () => {
  const counselingLogs = await prisma.counselingLogs.findMany({
    include: {
      Counselings: true,
      Users: true,
    },
  });

  return counselingLogs;
};

exports.addCounselingLog = async (payload) => {
  const newCounselingLog = await prisma.counselingLogs.create({
    data: { ...payload },
  });
  return newCounselingLog;
};
