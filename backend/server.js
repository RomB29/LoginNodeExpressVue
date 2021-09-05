const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
/*
What is CORS?
CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API. 
This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API.

In other words, CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies 
which domains access your resources.

*/

/*
PROMISE ==> function --> then ; .catch (handle error or use try catch)

OU

AWAIT ()


*/



const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: false}).then(() => {
  console.log('RomB29 - Drop and Resync dB');
  // initial(); // Once created, must be comment
});
// parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to RomB29 application." });
// });

// routes
require("./app/routes/auth.routes")(app); // On utilise module exports car si on écrit app = on écrit par dessus app
require("./app/routes/user.routes")(app);

// parse requests of content-type – application/json

// parse requests of content-type – application/x-www-form-urlencoded


// To parse the incoming requests with JSON payloads
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

initial = () => {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}