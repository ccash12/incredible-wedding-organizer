const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserWedding extends Model {}

UserWedding.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    weddingId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'wedding',
            key: 'id'
        }
    }
},
{
    sequelize,
})

module.exports = UserWedding;