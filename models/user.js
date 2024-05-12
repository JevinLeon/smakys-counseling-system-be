"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Counseling, { foreignKey: "counselorId" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: { unique: true, type: DataTypes.STRING },
      role: DataTypes.ENUM("admin", "superadmin"),
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
