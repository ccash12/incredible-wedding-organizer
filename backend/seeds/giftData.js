const { Gift } = require("../models");

const seedGift = async () => {
  const giftData = await Gift.bulkCreate([
    {
      item: "Blender",
      dateThankYouSent: "2022-11-02 02:56:42",
      guestId: 1,
    },
    {
      item: "Toaster",
      dateThankYouSent: "2022-11-02 02:56:42",
      guestId: 2,
    },
    {
      item: "Measuring Cups",
      guestId: 3,
    },
    {
      item: "Blanket",
      guestId: 4,
    },
    {
      item: "Microwave",
      guestId: 5,
    },
    {
      item: "TV",
      guestId: 6,
    },
    {
      item: "Rice Maker",
      guestId: 7,
    },
    {
      item: "How to stay married in 10 eazy steps",
      guestId: 8,
    },
  ]);
};

module.exports = seedGift;
