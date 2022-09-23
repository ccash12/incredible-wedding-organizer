const { Weddings, User } = require("../../models");
const { authMiddleware } = require("../../utils/auth");
const router = require("express").Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const weddingsData = await Weddings.create({
      weddingName: req.body.weddingName,
      date: req.body.date,
      spouseName1: req.body.spouseName1,
      spouseName2: req.body.spouseName2,
    });
    const user = await User.findOne({
      where: { email: req.user.email },
    });
    await weddingsData.addUser(user);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "an error occured", err: err });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      include: Weddings,
    });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "an error occured", err: err });
  }
});

module.exports = router;
