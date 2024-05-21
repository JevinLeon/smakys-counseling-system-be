"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Counseling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Counseling.hasMany(models.CounselingLog, { foreignKey: "counselingId" });
      Counseling.belongsTo(models.User, { foreignKey: "counselorId" });
    }
  }
  Counseling.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      notes: DataTypes.TEXT,
      date: DataTypes.DATE,
      counselingType: DataTypes.ENUM(
        "Layanan Dasar - Seminar",
        "Layanan Dasar - Klasikal",
        "Layanan Responsive",
        "Layanan Penempatan dan Perencanaan Individual"
      ),
      arrivalType: DataTypes.ENUM("voluntary", "called", "referral"),
      status: DataTypes.ENUM("pending", "completed"),
      // isNew: DataTypes.BOOLEAN,
      // prevCounselingId: DataTypes.BOOLEAN,
      isGroup: DataTypes.BOOLEAN,
      counselorId: DataTypes.INTEGER,
      NISN: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Counseling",
      paranoid: true,
    }
  );
  return Counseling;
};
