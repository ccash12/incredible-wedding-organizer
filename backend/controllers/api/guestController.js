const { Guest } = require("../../models");
const { authMiddleware, signToken } = require("../../utils/auth");
const router = require('express').Router();

router.get("/:id/:party",authMiddleware, async (req, res) =>{
    try {
        res.status(200).json({message:rec.params.id,message2:rec.params.party})
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
    }
});

module.exports = router