const express = require("express");
const app = express();
const {
  getCategories,
  getReviewByID,
} = require("./db/controllers/controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewByID);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Invalid Path" });
});

module.exports = app;
