const excelJs = require("exceljs");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");
const studentServices = require("../services/student");
const path = require("path");

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
    } else {
      const dateOfBirth = new Date(
        Date.parse(new Date(newStudent.dateOfBirth).toUTCString()) -
          new Date(newStudent.dateOfBirth).getTimezoneOffset() * 60000
      );
      newStudent.dateOfBirth = dateOfBirth;
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
    } else {
      const dateOfBirth = new Date(
        Date.parse(new Date(selectedStudent.dateOfBirth).toUTCString()) -
          new Date(selectedStudent.dateOfBirth).getTimezoneOffset() * 60000
      );
      selectedStudent.dateOfBirth = dateOfBirth;
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

exports.exportExcel = async (req, res, next) => {
  try {
    let workbook = new excelJs.Workbook();

    const sheet = workbook.addWorksheet("students");
    sheet.columns = [
      {
        header: "NISN",
        key: "NISN",
        width: 25,
      },
      { header: "NIS", key: "NIS", width: 25 },
      { header: "name", key: "name", width: 25 },
      { header: "classId", key: "classId", width: 25 },
      { header: "phoneNo", key: "phoneNo", width: 25 },
      { header: "address", key: "address", width: 50 },
      { header: "healthHistory", key: "healthHistory", width: 25 },
      { header: "email", key: "email", width: 25 },
      { header: "dateOfBirth", key: "dateOfBirth", width: 25 },
      { header: "placeOfBirth", key: "placeOfBirth", width: 25 },
      { header: "universityTarget", key: "universityTarget", width: 25 },
      { header: "status", key: "status", width: 25 },
      { header: "guardianName", key: "guardianName", width: 25 },
      { header: "guardianJob", key: "guardianJob", width: 25 },
      { header: "guardianPhoneNo", key: "guardianPhoneNo", width: 25 },
    ];

    const students = await studentServices.getStudents();

    await students.map((student, i) => {
      let row = sheet.addRow({
        NISN: student.NISN,
        NIS: student.NIS,
        name: student.name,
        classId: student.classId,
        phoneNo: student.phoneNo,
        address: student.address,
        healthHistory: student.healthHistory,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        placeOfBirth: student.placeOfBirth,
        universityTarget: student.universityTarget,
        status: student.status,
        guardianName: student.guardianName,
        guardianJob: student.guardianJob,
        guardianPhoneNo: student.guardianPhoneNo,
      });

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "student-export.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.addStudentsWithExcel = async (req, res, next) => {
  try {
    if (req.file?.filename == null || req.file?.filename == "undefined") {
      return next({
        statusCode: 400,
        message: "No file specified",
      });
    }

    const filePath = path.join("tmp/", req.file.filename);

    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });

    // fs.remove(filePath);

    await studentServices.truncate();
    excelData.students.forEach((student) => {
      const dateOfBirth = new Date(
        Date.parse(new Date(student.dateOfBirth).toUTCString()) -
          new Date(student.dateOfBirth).getTimezoneOffset() * 60000
      );
      student.dateOfBirth = dateOfBirth;
    });
    const data = await studentServices.addManyStudents(excelData.students);

    res.status(200).json({
      data,
      excelData,
      message: "File uploaded successfully",
    });
  } catch (error) {
    if (error?.meta?.field_name == "Students_classId_fkey (index)")
      error.message = "Class Id is not valid! Please enter a valid class id";

    next(error);
  }
};
