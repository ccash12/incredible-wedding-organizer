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
    {
      userId: 2,
      weddingId: 3,
    },
    {
      userId: 1,
      weddingId: 3,
    },
  ]);
};

module.exports = seedUserWedding;
