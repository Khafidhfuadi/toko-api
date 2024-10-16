const express = require("express");
const router = express.Router();
const {
  createToko,
  getToko,
  getTokoById,
  updateToko,
  deleteToko,
} = require("../controllers/tokoController");
const auth = require("../middlewares/auth");

router.post("/toko", auth, createToko);
router.get("/toko", auth, getToko);
router.get("/toko/:id", auth, getTokoById);
router.put("/toko/:id", auth, updateToko);
router.delete("/toko/:id", auth, deleteToko);

module.exports = router;
