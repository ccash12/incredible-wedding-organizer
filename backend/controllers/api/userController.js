const { User } = require("../../models");
const { authMiddleware, signToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");
const router = require("express").Router();

// LOGIN USER - GET TOKEN
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).send("incorrect email or password");
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = signToken(foundUser);

        res
          .status(200)
          .json({ token, message: "Logged in successfully 😊 👌" });
      } else {
        res.status(401).json({ err: "incorrect email or password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// CREATE A NEW USER
router.post("/signup", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (foundUser) {
        res.status(403).send("user already exists please login");
      } else {
        User.create({
          firstname: req.body.firstname,
          password: req.body.password,
          email: req.body.email.toLowerCase(),
        })
          .then((newUser) => {
            res.json(newUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

//verify token in localstorage
router.get("/verify", authMiddleware, (req, res) => {
  User.findByPk(req.user.id)
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

// update email, first name, or password
router.put("/update", authMiddleware, async (req, res) => {
  if (req.body.email) {
    User.update(
      { email: req.body.email },
      { where: { email: req.user.data.email } }
    )
      .then((update) => {
        res.status(200).json(update);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  if (req.body.firstname) {
    User.update(
      { firstname: req.body.firstname },
      { where: { email: req.user.data.email } }
    )
      .then((update) => {
        res.status(200).json(update);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  if (req.body.password) {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    User.update(
      { password: newPassword },
      { where: { email: req.user.data.email } }
    )
      .then((update) => {
        res.status(200).json(update);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const userDelete = await User.destroy({
      where: {
        id: req.user.id,
      },
    });
    if (!userDelete) {
      res.status(500).json({ message: "Error deleting user" });
      return;
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
