const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const apiRouter = require("./routes/api.routes");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);

module.exports = app;