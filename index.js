const express = require("express");
const app = express();
const {PORT, NODE_ENV} =require("./config/config")
const bodyParser = require('body-parser');
const port = PORT || 3000;
const server = require("http").createServer(app);
const passport = require('./auth/passport_auth');
const db = require('./database/db');
const userRoutes = require('./routes/v1/userRoutes');
const authRoutes = require('./routes/v1/authRoutes');
let env = NODE_ENV;

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/user', userRoutes);



if (env === "production") {
  server.listen(PORT || 4000, () => {
    console.log(`App listening at http://localhost:4000`);
  });
} else {
  server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}