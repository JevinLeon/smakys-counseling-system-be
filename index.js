require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");

const express = require("express");
const router = require("./routes");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.use("*", (req, res, next) => {
  res.status(404).json({
    data: null,
    message: "Page not found.",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error.";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message: message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
