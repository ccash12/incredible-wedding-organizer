const User = require("./User");
const Wedding = require("./Wedding");
const UserWedding = require("./UserWedding");
const Party = require("./Party");
const Guest = require("./Guest");
const Gift = require("./Gift");

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
  onDelete: "cascade",
});

Wedding.hasMany(Party, {
  foreignKey: "weddingId",
});

Guest.belongsTo(Party, {
  foreignKey: "partyId",
  onDelete: "cascade",
});

Party.hasMany(Guest, {
  foreignKey: "partyId",
});

Gift.belongsTo(Guest, {
  foreignKey: "guestId",
  onDelete: "cascade",
});

Guest.hasMany(Gift, {
  foreignKey: "guestId",
});

module.exports = { User, Wedding, UserWedding, Party, Guest, Gift };
