const { Wedding, Party, UserWedding } = require("../../models");
const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");

router.post("/:id", authMiddleware, async (req, res) => {
   try {
      const findWedding = await UserWedding.findOne({
      where: { weddingId: req.params.id, userId: req.user.id },
      });
         if (!findWedding) {
         res.status(404).json({ message: "No wedding found" });
         return;
      }
         if (!req.body.dateInviteSent) {
         req.body.dateInviteSent = null;
      }
         if (!req.body.dateRSVPReceived) {
         req.body.dateRSVPReceived = null;
      }
         const partyData = await Party.create({
         weddingId: req.params.id,
         partyName: req.body.partyName,
         dateInviteSent: req.body.dateInviteSent,
         dateRSVPReceived: req.body.dateRSVPReceived,
         street1: req.body.street1,
         street2: req.body.street2,
         city: req.body.city,
         state: req.body.state,
         zipcode: req.body.zipcode,
         country: req.body.country,
      });
    res.status(200).json(partyData);
  } catch (err) {
    res.status(500).json({ message: "error error error", err: err });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const findWedding = await UserWedding.findOne({
      where: { weddingId: req.params.id, userId: req.user.id },
    });
    if (!findWedding) {
      res.status(404).json({ messag: "No wedding found" });
      return;
    }
    const partyData = await Party.findAll({
      where: { weddingId: req.params.id },
    });
    res.status(200).json(partyData);
  } catch (err) {
    res.status(500).json({ message: "error", err: err });
  }
});

router.delete("/:weddingId/:partyId", authMiddleware, async (req,res)=>{
   try {
      const weddingDestroy = await UserWedding.findOne({
         where: { weddingId: req.params.weddingId, userId: req.user.id },
       });
       if (!weddingDestroy) {
         res.status(404).json({ message: "No wedding found" });
         return;
       }
       const destruction = await Party.destroy({
         where: {
            id: req.params.partyId
         }
       })
       res.status(200).json(destruction)
   }catch(err) {
      res.status(500).json({ message: "error", err: err });
   }
})

module.exports = router;
