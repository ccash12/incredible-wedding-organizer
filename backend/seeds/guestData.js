const { Guest } = require("../models");

const seedGuest = async () => {
  const guestData = await Guest.bulkCreate([
    {
      guestName: "Jesse Johnson",
      meal: "Chicken",
      partyId: 1,
    },
    {
      guestName: "James Johnson",
      meal: "Steak",
      partyId: 1,
    },
    {
      guestName: "James Jorgenson",
      meal: "Steak",
      partyId: 2,
    },
    {
      guestName: "Carl Jorgenson",
      meal: "Fish",
      partyId: 2,
    },
    {
      guestName: "Nancy Jackson",
      meal: "Veggie",
      partyId: 3,
    },
    {
      guestName: "Gerald Jackson",
      meal: "Steak",
      partyId: 3,
    },
    {
      guestName: "Eustice Jefferson",
      meal: "Steak",
      partyId: 4,
    },
    {
      guestName: "Buttercup Jefferson",
      meal: "Fish",
      partyId: 4,
    },
  ]);
};

module.exports = seedGuest;
