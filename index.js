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

// database.sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.info("database connected");
//   })
//   .catch((err) => {
//     console.error("database disconnect: " + err.message);
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(route);

app.get("/", (req, res) => {
  res.json({
    message: "REST API Server Pesona Wisata",
  });
});

app.use('/uploads/img/profile', express.static('uploads/img/profile'));
app.use('/uploads/img/desawisata', express.static('uploads/img/desawisata'));
app.use('/uploads/img/wisata', express.static('uploads/img/wisata'));
app.use('/uploads/img/kuliner', express.static('uploads/img/kuliner'));
app.use('/uploads/img/penginapan', express.static('uploads/img/penginapan'));
app.use('/uploads/img/penginapan/gallery', express.static('uploads/img/penginapan/gallery'));
app.use('/uploads/img/menu', express.static('uploads/img/menu'));

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3001");
});