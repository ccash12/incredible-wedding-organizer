const {Wedding, Party} = require("../../models");
const router = require('express').Router();
const { authMiddleware } = require("../../utils/auth");

router.post('/', authMiddleware, async (req, res)=>{
 try {
    const partyData = await Party.create({
        weddingId: req.body.weddingId,
        partyName: req.body.partyName,
        dateInviteSent: req.body.dateInviteSent,
        dateRSVPReceived: req.body.dateRSVPReceived,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
    })
    res.status(200).json(partyData)
 }catch(err) {
    res.status(500).json({message: "error error error", err: err})
 }
})

module.exports = router;