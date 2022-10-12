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
});

Wedding.hasMany(Party, {
  foreignKey: "weddingId",
});

Guest.belongsTo(Party, {
  foreignKey:"partyId",
})

Party.hasMany(Guest, {
  foreignKey:"partyId",
})

Gift.belongsTo(Guest, {
  foreignKey: "giftId",
})



module.exports = { User, Wedding, UserWedding, Party, Guest, Gift };
