const { Wedding } = require("../models");

const seedWedding = async () => {
  const weddingData = await Wedding.bulkCreate([
    {
      weddingName: "Bob and Bobette Wedding",
      date: "2023-04-01 02:56:42",
      spouseName1: "Bob",
      spouseName2: "Bobette",
    },
    {
      weddingName: "Carl and Carlette Wedding",
      date: "2023-11-02 02:56:42",
      spouseName1: "Carl",
      spouseName2: "Carlette",
    },
  ]);
};

module.exports = seedWedding;
