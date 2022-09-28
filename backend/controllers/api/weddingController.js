const { Wedding, User, UserWedding } = require("../../models");
const { restore } = require("../../models/User");
const { authMiddleware } = require("../../utils/auth");
const router = require("express").Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const weddingData = await Wedding.create({
      weddingName: req.body.weddingName,
      date: req.body.date,
      spouseName1: req.body.spouseName1,
      spouseName2: req.body.spouseName2,
    });
    const userWeddingData = await UserWedding.create({
      userId: req.user.id,
      weddingId: weddingData.id,
    });
    res.status(200).json({ message: "success", weddingData, userWeddingData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "an error occured", err: err });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      include: Wedding,
    });
    if (!user) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "an error occured", err: err });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const weddingDestroy = await UserWedding.findOne({
      where: { weddingId: req.params.id, userId: req.user.id },
    });
    if (!weddingDestroy) {
      res.status(404).json({ message: "No wedding found" });
      return;
    }
    let destruction = await Wedding.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(destruction);
  } catch (err) {
    res.status(400).json({ message: "an error occured", err: err });
  }
});

router.post("/add/:id", authMiddleware, async (req, res) => {
  try {
    const findWedding = await UserWedding.findOne({
      where: { weddingId: req.params.id, userId: req.user.id },
    });
    if (!findWedding) {
      res.status(404).json({ message: "No wedding found" });
      return;
    }
    const added = UserWedding.create({
      weddingId: req.params.id,
      userId: req.body.userId,
    });
    res.status(200).json({message:"Success",added})
  } catch (err) {
    res.status(400).json({ message: "an error occured", err: err });
  }
});

module.exports = router;
