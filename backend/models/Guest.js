const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Guest extends Model {}

Guest.init(
  {
    guestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meal: {
      type: DataTypes.STRING,
    },

    seat: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

module.exports = Guest;
