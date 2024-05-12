const studentServices = require("../services/student");

exports.getStudents = async (req, res, next) => {
  try {
    const data = await studentServices.getStudents();
    res.status(200).json({
      data,
      message: "Students fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await studentServices.getStudentById(id);

    res.status(200).json({
      data,
      message: `Student with id ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.addStudent = async (req, res, next) => {
  try {
    const newStudent = req?.body;

    if (!newStudent.NISN || newStudent.NISN == "") {
      return next({
        statusCode: 500,
        message: "Student NISN is required",
      });
    }
    if (!newStudent.NIS || newStudent.NIS == "") {
      return next({
        statusCode: 500,
        message: "Student NIS is required",
      });
    }
    if (!newStudent.name || newStudent.name == "") {
      return next({
        statusCode: 500,
        message: "Student name is required",
      });
    }
    if (!newStudent.phoneNo || newStudent.phoneNo == "") {
      return next({
        statusCode: 500,
        message: "Student phone no is required",
      });
    }
    if (!newStudent.address || newStudent.address == "") {
      return next({
        statusCode: 500,
        message: "Student address is required",
      });
    }
    if (!newStudent.email || newStudent.email == "") {
      return next({
        statusCode: 500,
        message: "Student email is required",
      });
    }
    if (!newStudent.dateOfBirth || newStudent.dateOfBirth == "") {
      return next({
        statusCode: 500,
        message: "Student date of birth is required",
      });
    }
    if (!newStudent.placeOfBirth || newStudent.placeOfBirth == "") {
      return next({
        statusCode: 500,
        message: "Student place of birth is required",
      });
    }
    if (!newStudent.status || newStudent.status == "") {
      return next({
        statusCode: 500,
        message: "Student status is required",
      });
    }
    if (!newStudent.guardianName || newStudent.guardianName == "") {
      return next({
        statusCode: 500,
        message: "Student guardian name is required",
      });
    }
    if (!newStudent.guardianJob || newStudent.guardianJob == "") {
      return next({
        statusCode: 500,
        message: "Student guardian job is required",
      });
    }
    if (!newStudent.guardianPhoneNo || newStudent.guardianPhoneNo == "") {
      return next({
        statusCode: 500,
        message: "Student guardian phone no is required",
      });
    }

    const data = await studentServices.addStudent(newStudent);

    res.status(201).json({
      data,
      message: "Student added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const selectedStudent = req?.body;
    if (!selectedStudent.NISN || selectedStudent.NISN == "") {
      return next({
        statusCode: 500,
        message: "Student NISN is required",
      });
    }
    if (!selectedStudent.NIS || selectedStudent.NIS == "") {
      return next({
        statusCode: 500,
        message: "Student NIS is required",
      });
    }
    if (!selectedStudent.name || selectedStudent.name == "") {
      return next({
        statusCode: 500,
        message: "Student name is required",
      });
    }
    if (!selectedStudent.phoneNo || selectedStudent.phoneNo == "") {
      return next({
        statusCode: 500,
        message: "Student phone no is required",
      });
    }
    if (!selectedStudent.address || selectedStudent.address == "") {
      return next({
        statusCode: 500,
        message: "Student address is required",
      });
    }
    if (!selectedStudent.email || selectedStudent.email == "") {
      return next({
        statusCode: 500,
        message: "Student email is required",
      });
    }
    if (!selectedStudent.dateOfBirth || selectedStudent.dateOfBirth == "") {
      return next({
        statusCode: 500,
        message: "Student date of birth is required",
      });
    }
    if (!selectedStudent.placeOfBirth || selectedStudent.placeOfBirth == "") {
      return next({
        statusCode: 500,
        message: "Student place of birth is required",
      });
    }
    if (!selectedStudent.status || selectedStudent.status == "") {
      return next({
        statusCode: 500,
        message: "Student status is required",
      });
    }
    if (!selectedStudent.guardianName || selectedStudent.guardianName == "") {
      return next({
        statusCode: 500,
        message: "Student guardian name is required",
      });
    }
    if (!selectedStudent.guardianJob || selectedStudent.guardianJob == "") {
      return next({
        statusCode: 500,
        message: "Student guardian job is required",
      });
    }
    if (
      !selectedStudent.guardianPhoneNo ||
      selectedStudent.guardianPhoneNo == ""
    ) {
      return next({
        statusCode: 500,
        message: "Student guardian phone no is required",
      });
    }
    const data = await studentServices.updateStudent(id, selectedStudent);

    res.status(201).json({
      data,
      message: "Student updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await studentServices.deleteStudent(id);
    res.status(200).json({
      data,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
