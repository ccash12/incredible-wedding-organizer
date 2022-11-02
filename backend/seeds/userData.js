const { User } = require("../models");

const seedUser = async () => {
  const userData = await User.bulkCreate(
    [
      {
        email: "bob@bob.bob",
        firstname: "bob",
        password: "password",
      },
      {
        email: "carl@carl.carl",
        firstname: "carl",
        password: "password",
      },
    ],
    { individualHooks: true }
  );
};

module.exports = seedUser;
