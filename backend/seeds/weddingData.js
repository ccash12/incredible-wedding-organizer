const { Wedding } = require("../models");

const seedWedding = async () => {
  const weddingData = await Wedding.bulkCreate([
    {
      weddingName: "Wedding 1",
      date: "2023-04-01 02:56:42",
      spouseName1: "Bob",
      spouseName2: "Bobette",
    },
    {
      weddingName: "Wedding 2",
      date: "2023-11-02 02:56:42",
      spouseName1: "Carl",
      spouseName2: "Carlette",
    },
    {
      weddingName: "Wedding 3",
      date: "2023-11-02 02:56:42",
      spouseName1: "Carl",
      spouseName2: "Carlette",
    },
  ]);
};

module.exports = seedWedding;
