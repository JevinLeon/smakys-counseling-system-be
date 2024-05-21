"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CounselingLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CounselingLog.belongsTo(models.Counseling, {
        foreignKey: "counselingId",
      });
      CounselingLog.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  CounselingLog.init(
    {
      activity: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      counselingId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "CounselingLog",
      paranoid: true,
    }
  );
  return CounselingLog;
};
