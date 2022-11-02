const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedWedding = require("./weddingData");
const seedUserWedding = require("./userWeddingData");
const seedParty = require("./partyData");
const seedGuest = require("./guestData")
const seedGift = require("./giftData")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUser();
  console.log("\n----- USERS SYNCED -----\n");

  await seedWedding();
  console.log("\n----- WEDDINGS SYNCED -----\n");

  await seedUserWedding();
  console.log("\n----- USERWEDDING SYNCED -----\n");

  await seedParty();
  console.log("\n----- PARTIES SYNCED -----\n");

  await seedGuest();
  console.log("\n----- GUESTS SYNCED -----\n");

  await seedGift();
  console.log("\n----- GIFTS SYNCED -----\n");

  process.exit(0);
};

seedDatabase();
