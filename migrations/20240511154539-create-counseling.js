"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Counselings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      counselingType: {
        type: Sequelize.ENUM(
          "Layanan Dasar - Seminar",
          "Layanan Dasar - Klasikal",
          "Layanan Responsive",
          "Layanan Penempatan dan Perencanaan Individual"
        ),
        allowNull: false,
      },
      arrivalType: {
        type: Sequelize.ENUM("voluntary", "called", "referral"),
        allowNull: false,
        defaultValue: "called",
      },
      status: {
        type: Sequelize.ENUM("pending", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },
      // isNew: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: true,
      // },
      // prevCounselingId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: {
      //       tableName: "Counselings",
      //     },
      //     key: "id",
      //   },
      // },
      isGroup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      counselorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      NISN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Counselings");
  },
};
