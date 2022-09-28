const User = require('./User');
const Wedding = require('./Wedding')
const UserWedding = require('./UserWedding')

User.belongsToMany(Wedding, {
    through: "UserWedding",
    foreignKey: 'userId'
});
Wedding.belongsToMany(User, {
    through: "UserWedding",
    foreignKey: 'weddingId'
});

module.exports = {User, Wedding, UserWedding};