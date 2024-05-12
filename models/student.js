"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Class, { foreignKey: "classId" });
    }
  }
  Student.init(
    {
      NISN: { type: DataTypes.STRING, unique: true },
      NIS: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      classId: DataTypes.INTEGER,
      phoneNo: DataTypes.STRING,
      address: DataTypes.TEXT,
      healthHistory: DataTypes.TEXT,
      email: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      placeOfBirth: DataTypes.STRING,
      universityTarget: DataTypes.STRING,
      status: DataTypes.ENUM("active", "graduated", "dropped"),
      guardianName: DataTypes.STRING,
      guardianJob: DataTypes.STRING,
      guardianPhoneNo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Student",
      paranoid: true,
    }
  );
  return Student;
};
