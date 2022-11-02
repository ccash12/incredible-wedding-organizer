const { Party } = require("../models");

const seedParty = async () => {
  const partyData = await Party.bulkCreate([
    {
      partyName: "The Johnsons",
      dateInviteSent: "2022-11-02 02:56:42",
      street1: "123 Elm St",
      city: "Elmsburg",
      state: "OK",
      zipcode: "12345",
      country: "US",
      weddingId: 1,
    },
    {
      partyName: "Jorgenson",
      dateInviteSent: "2022-11-02 02:56:42",
      street1: "123 Elm St",
      city: "Elmsburg",
      state: "OK",
      zipcode: "12345",
      country: "US",
      weddingId: 1,
    },
    {
      partyName: "Jacksons",
      dateInviteSent: "2022-11-02 02:56:42",
      street1: "123 Elm St",
      city: "Elmsburg",
      state: "OK",
      zipcode: "12345",
      country: "US",
      weddingId: 2,
    },
    {
      partyName: "Jeffersons",
      dateInviteSent: "2022-11-02 02:56:42",
      street1: "123 Elm St",
      city: "Elmsburg",
      state: "OK",
      zipcode: "12345",
      country: "US",
      weddingId: 2,
    },
  ]);
};

module.exports = seedParty;
