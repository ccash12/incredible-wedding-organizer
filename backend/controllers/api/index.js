const express = require("express");
const router = express.Router();

// The 'http://localhost:3001/api/' endpoints

const userRoutes = require("./userController");
router.use("/user", userRoutes);

const weddingsRoutes = require ('./weddingsController');
router.use("/weddings", weddingsRoutes);

module.exports = router;
