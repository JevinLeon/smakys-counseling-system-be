const excelJs = require("exceljs");
const classServices = require("../services/class");

exports.getClasses = async (req, res, next) => {
  try {
    const data = await classServices.getClasses();
    res.status(200).json({
      data,
      message: "Classes fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await classServices.getClassById(id);

    res.status(200).json({
      data,
      message: `Class with id ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.addClass = async (req, res, next) => {
  try {
    const newClass = req?.body;

    if (!newClass.name || newClass.name == "") {
      return next({
        statusCode: 500,
        message: "Class name is required",
      });
    }

    const data = await classServices.addClass(newClass);

    res.status(201).json({
      data,
      message: "Class added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const selectedClass = req?.body;

    if (!selectedClass.name || selectedClass.name == "") {
      return next({
        statusCode: 500,
        message: "Class name is required",
      });
    }
    const data = await classServices.updateClass(id, selectedClass);

    res.status(201).json({
      data,
      message: "Class updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const data = await classServices.deleteClass(id);
    res.status(200).json({
      data,
      message: "Class deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.exportExcel = async (req, res, next) => {
  try {
    let workbook = new excelJs.Workbook();

    const sheet = workbook.addWorksheet("classes");
    sheet.columns = [
      {
        header: "name",
        key: "name",
        width: 25,
      },
    ];

    const classes = await classServices.getClasses();

    await classes.map((_class, i) => {
      let row = sheet.addRow({
        name: _class.name,
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
      "attachment;filename=" + "class-export.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
