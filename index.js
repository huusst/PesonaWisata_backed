require('dotenv').config();
const express = require("express");
const app = express();
const database = require("./models");
const route = require('./routes/route');
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'}));

database.sequelize
  .sync({ force: false })
  .then(() => {
    console.info("database connected");
  })
  .catch((err) => {
    console.error("database disconnect: " + err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(route);

app.get("/", (req, res) => {
  res.json({
    message: "REST API Server Pesona Wisata",
  });
});
app.listen(process.env.PORT, () => {
  console.log("Server running on port 3001");
});