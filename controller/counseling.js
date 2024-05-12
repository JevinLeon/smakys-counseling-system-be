const counselingServices = require("../services/counseling");

exports.getCounselings = async (req, res, next) => {
  try {
    const data = await counselingServices.getCounselings();
    res.status(200).json({
      data,
      message: "Counselings fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getCounselingById = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await counselingServices.getCounselingById(id);

    res.status(200).json({
      data,
      message: `Counseling with id ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCounseling = async (req, res, next) => {
  try {
    const newCounseling = req?.body;

    if (!newCounseling.title || newCounseling.title == "") {
      return next({
        statusCode: 500,
        message: "Counseling title is required",
      });
    }
    if (!newCounseling.date || newCounseling.date == "") {
      return next({
        statusCode: 500,
        message: "Counseling date is required",
      });
    }
    if (!newCounseling.counselingType || newCounseling.counselingType == "") {
      return next({
        statusCode: 500,
        message: "Counseling type is required",
      });
    }
    if (!newCounseling.arrivalType || newCounseling.arrivalType == "") {
      return next({
        statusCode: 500,
        message: "Counseling arrival type is required",
      });
    }
    if (!newCounseling.status || newCounseling.status == "") {
      return next({
        statusCode: 500,
        message: "Counseling status is required",
      });
    }
    if (!newCounseling.counselorId || newCounseling.counselorId == "") {
      return next({
        statusCode: 500,
        message: "Counselor is required",
      });
    }
    if (!newCounseling.NISN || newCounseling.NISN == "") {
      return next({
        statusCode: 500,
        message: "Student NISN is required",
      });
    }

    const data = await counselingServices.addCounseling(newCounseling);

    res.status(201).json({
      data,
      message: "Counseling added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCounseling = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const selectedCounseling = req?.body;

    if (!selectedCounseling.title || selectedCounseling.title == "") {
      return next({
        statusCode: 500,
        message: "Counseling title is required",
      });
    }
    if (!selectedCounseling.date || selectedCounseling.date == "") {
      return next({
        statusCode: 500,
        message: "Counseling date is required",
      });
    }
    if (
      !selectedCounseling.counselingType ||
      selectedCounseling.counselingType == ""
    ) {
      return next({
        statusCode: 500,
        message: "Counseling type is required",
      });
    }
    if (
      !selectedCounseling.arrivalType ||
      selectedCounseling.arrivalType == ""
    ) {
      return next({
        statusCode: 500,
        message: "Counseling arrival type is required",
      });
    }
    if (!selectedCounseling.status || selectedCounseling.status == "") {
      return next({
        statusCode: 500,
        message: "Counseling status is required",
      });
    }
    if (
      !selectedCounseling.counselorId ||
      selectedCounseling.counselorId == ""
    ) {
      return next({
        statusCode: 500,
        message: "Counselor is required",
      });
    }
    if (!selectedCounseling.NISN || selectedCounseling.NISN == "") {
      return next({
        statusCode: 500,
        message: "Student NISN is required",
      });
    }
    const data = await counselingServices.updateCounseling(
      id,
      selectedCounseling
    );

    res.status(201).json({
      data,
      message: "Counseling updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCounseling = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await counselingServices.deleteCounseling(id);
    res.status(200).json({
      data,
      message: "Counseling deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
