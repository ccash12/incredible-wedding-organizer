const {Model, DataTypes} = require('sequelize');
const sequelize = require ('../config/connection');

class Guest extends Model {}

Guest.init ({
    guestName: {
            type: DataTypes.STRING, 
            allowNull: false
    },
    meal: {
        type: DataTypes.STRING,
    },

    seat: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER,
    },
    country: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
})
    
module.exports = Guest