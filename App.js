require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const db = require("./config/db-config");
const User = require("./models/user");
const Toko = require("./models/toko");

User.hasMany(Toko, { foreignKey: "user_id", as: "tokos" });
Toko.belongsTo(User, { foreignKey: "user_id", as: "user" });

db.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database: ", err);
  });

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
