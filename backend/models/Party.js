const {Model, DataTypes} = require('sequelize');
const sequelize = require ('../config/connection');

class Party extends Model {}

Party.init({
    partyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateInviteSent: {
        type: DataTypes.DATE,
    },
    dateRSVPReceived: {
        type: DataTypes.DATE,
    },
    street1: {
        type: DataTypes.STRING,
    },
    street2: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    }

},{
    sequelize,
})

module.exports = Party