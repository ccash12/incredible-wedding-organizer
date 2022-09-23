const User = require('./User');
const Weddings = require('./Weddings')

User.belongsToMany(Weddings, {
    through: "UserWeddings"
});
Weddings.belongsToMany(User, {
    through: "UserWeddings"
});

module.exports = {User, Weddings};