const { UserWedding,Party, Guest } = require("../../models");
const { authMiddleware} = require("../../utils/auth");
const router = require('express').Router();

router.post("/:weddingId/:partyId",authMiddleware, async (req, res) =>{
    try {
        const findWedding = await UserWedding.findOne({
            where: { weddingId: req.params.weddingId, userId: req.user.id },
        });
        if (!findWedding) {
            res.status(404).json({ message: "No wedding found" });
            return;
        }
        const partyData = await Guest.create({
            partyId: req.params.partyId,
            guestName: req.body.guestName,
            meal: req.body.meal,
            seat: req.body.seat,
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

    router.get("/:weddingId/:partyId", authMiddleware, async (req, res) => {
            try {
                const findWedding = await UserWedding.findOne({
                where: { weddingId: req.params.weddingId, userId: req.user.id },
                });
            if (!findWedding) {
                res.status(404).json({ message: "No wedding found" });
                return;
            }
            const partyData = await Guest.findAll({
                where: { partyId: req.params.partyId },
            });
            res.status(200).json(partyData);
            } catch (err) {
            res.status(500).json({ message: "error", err: err });
            }
        });
        
        router.delete("/:weddingId/:guestId", authMiddleware, async (req,res)=>{
            try {
                const weddingDestroy = await UserWedding.findOne({
                where: { weddingId: req.params.weddingId, userId: req.user.id },
                });
                if (!weddingDestroy) {
                res.status(404).json({ message: "No wedding found" });
                return;
                }
                const destruction = await Guest.destroy({
                where: {
                    id: req.params.guestId
                }
                })
                res.status(200).json(destruction)
            }catch(err) {
                res.status(500).json({ message: "error", err: err });
            }
        })
        
        router.put("update/:weddingId/:guestId", authMiddleware, async (req, res) => {
            try {
                const findWedding = await UserWedding.findOne({
                    where: { weddingId: req.params.id, userId: req.user.id },
                });
                if (!findWedding) {
                    res.status(404).json({ message: "No wedding found" });
                    return;
                }
                const update = await Guest.update(req.body, {
                    here: {
                    id: req.params.id,
                },
                });
                    res.status(200).json(update);
                } catch (err) {
                    res.status(400).json({ message: "an error occured", err: err });
            }
            });
            

    module.exports = router