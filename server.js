const express = require("express");
const cors = require("cors");
const { sequelize } = require('./app/models/db.js');
const app = express();
const path = require('path');
const { login, logout } = require('./app/authentification/authentification.js');

var corsOptions = {
  origin: ['http://127.0.0.1:5501','http://localhost:8001'], 
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the front_end directory
app.use(express.static(path.join(__dirname, 'front_end')));

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'front_end', 'main_page.html'));
});

require("./app/routes/bsclone.routes.js")(app);

// 404 route - when no other routes match, show the 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'front_end', '404.html'));
});

sequelize.sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Could not sync database:", err);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
