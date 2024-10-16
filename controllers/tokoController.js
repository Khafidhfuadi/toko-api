const Toko = require("../models/toko");

exports.createToko = async (req, res) => {
  const { nama, alamat } = req.body;
  const user_id = req.user.id;

  const toko = await Toko.create({ nama, alamat, user_id });
  res.status(201).json(toko);
};

exports.getToko = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const { count, rows } = await Toko.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  res.status(200).json({
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    tokos: rows,
  });
};

exports.getTokoById = async (req, res) => {
  const { id } = req.params;
  const toko = await Toko.findByPk(id);
  res.status(200).json(toko);
};

exports.updateToko = async (req, res) => {
  const { id } = req.params;
  const { nama, alamat } = req.body;

  const toko = await Toko.findByPk(id);
  toko.nama = nama;
  toko.alamat = alamat;

  await toko.save();
  res.status(200).json(toko);
};

exports.deleteToko = async (req, res) => {
  const { id } = req.params;
  await Toko.destroy({ where: { id } });
  res.status(200).json({
    message: "Toko berhasil dihapus",
  });
};
