const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());


const routes = require("./Routes/routes");
app.use("/api", routes);


app.listen(process.env.PORT, (req, res) => {
  console.log("Connected to database on " + process.env.PORT);
});
