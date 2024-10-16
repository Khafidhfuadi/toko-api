const Toko = require("../models/toko");

exports.createToko = async (req, res) => {
  const { nama, alamat } = req.body;
  const user_id = req.user.id;

  const toko = await Toko.create({ nama, alamat, user_id });
  res.status(201).json(toko);
};

exports.getToko = async (req, res) => {
  const toko = await Toko.findAll();
  res.status(200).json(toko);
};
