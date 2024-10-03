const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http").createServer(app);
const router = express.Router();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

require("./Routes/JobsRoute")(router);
app.use("/api", router);

http.listen(process.env.PORT, (req, res) => {
  console.log("Connected to server on PORT: " + process.env.PORT);
});
