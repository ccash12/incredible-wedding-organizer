const { UserWedding } = require("../models");

const seedUserWedding = async () => {
  const userWeddingData = await UserWedding.bulkCreate([
    {
      userId: 1,
      weddingId: 1,
    },
    {
      userId: 2,
      weddingId: 2,
    },
  ]);
};

module.exports = seedUserWedding;
