const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const cookieSession = require("cookie-session");

dotenv.config({ path: './src/Config/config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

const db = require("./src/Models");
const Role = db.role;

// const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("successfully connected");
        initial();
    }
})

const app = express();

var corsOptions = {
    origin: ["http://localhost:8081"], 
    credentials: true
  }
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  app.use(
    cookieSession({
      name: "bezkoder-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true
    })
  );

//   simple test route 
app.get('/', (req, res) => {
    res.json({ message: 'welcome to rhope home' });
})

// routes
require("./src/Routes/auth.routes")(app);
require("./src/Routes/user.routes")(app);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
}

module.exports = app;