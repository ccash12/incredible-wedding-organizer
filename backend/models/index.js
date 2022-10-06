const User = require("./User");
const Wedding = require("./Wedding");
const UserWedding = require("./UserWedding");
const Party = require("./Party");

User.belongsToMany(Wedding, {
  through: "UserWedding",
  foreignKey: "userId",
});
Wedding.belongsToMany(User, {
  through: "UserWedding",
  foreignKey: "weddingId",
});

Party.belongsTo(Wedding, {
  foreignKey: "weddingId",
});

Wedding.hasMany(Party, {
  foreignKey: "weddingId",
});

module.exports = { User, Wedding, UserWedding, Party };
