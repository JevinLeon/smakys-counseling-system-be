const { Counseling, User } = require("../../models");

exports.getCounselings = async () => {
  const counselings = await Counseling.findAll({
    include: {
      model: User,
    },
  });

  return counselings;
};

exports.getCounselingById = async (id) => {
  const selectedCounseling = await Counseling.findOne({
    where: { id },
    include: {
      model: User,
    },
  });

  if (selectedCounseling) {
    return selectedCounseling;
  }

  throw new Error("Counseling not found!");
};

exports.addCounseling = async (payload) => {
  const newCounseling = await Counseling.create({ ...payload });
  return newCounseling;
};

exports.updateCounseling = async (id, payload) => {
  const selectedCounseling = await Counseling.findOne({ where: { id } });

  if (selectedCounseling) {
    const updatedCounseling = await selectedCounseling.update({ ...payload });
    return updatedCounseling;
  }
  throw new Error("Counseling not found!");
};

exports.deleteCounseling = async (id) => {
  const selectedCounseling = await Counseling.findOne({ where: { id } });
  if (selectedCounseling) {
    const deletedCounseling = await selectedCounseling.destroy();
    return deletedCounseling;
  }

  throw new Error("Counseling not found!");
};
