const Toko = require("../models/toko");

exports.createToko = async (req, res) => {
  const { nama, alamat } = req.body;
  const user_id = req.user.id;

  const toko = await Toko.create({ nama, alamat, user_id });
  res.status(201).json(toko);
};
