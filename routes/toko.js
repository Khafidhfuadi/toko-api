const express = require("express");
const router = express.Router();
const { createToko, getToko } = require("../controllers/tokoController");
const auth = require("../middlewares/auth");

router.post("/toko", auth, createToko);
router.get("/toko", auth, getToko);

module.exports = router;
