const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Gift extends Model {}

Gift.init(
  {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dateThankYouSent: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
  }
);

module.exports = Gift;
