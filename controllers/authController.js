const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { check, validationResult } = require("express-validator");

exports.register = [
  check("nama").not().isEmpty().withMessage("Nama diperlukan"),
  check("email").isEmail().withMessage("Email tidak valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nama, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        nama,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User berhasil didaftarkan",
        user: {
          id: newUser.id,
          nama: newUser.nama,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
