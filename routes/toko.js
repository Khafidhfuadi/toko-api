const express = require("express");
const router = express.Router();
const { createToko } = require("../controllers/tokoController");
const auth = require("../middlewares/auth");

router.post("/toko", auth, createToko);

module.exports = router;
