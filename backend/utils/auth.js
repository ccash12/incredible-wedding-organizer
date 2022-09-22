const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      jwt.verify(token, process.env.TOKEN_KEY, function (err, data) {
        if (err) {
          console.log("token error " + err);
          return res.status(403).send("invalid token");
        } else {
          console.log("success");
          req.user = data.data;
          next();
        }
      });
    } else {
      console.log("bad");
      return res.status(403).send("include your token");
    }
  },
  signToken: function ({ firstname, id, email }) {
    const payload = { firstname, id, email };
    // return jwt.sign({ data: payload }, process.env.TOKEN_KEY, {expiresIn: "2h"});
    return jwt.sign({ data: payload }, process.env.TOKEN_KEY);
  },
};