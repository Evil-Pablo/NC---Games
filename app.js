const express = require("express");
const app = express();
const {
  getCategories,
  getReviewByID,
  patchVotesByReviewID,
} = require("./db/controllers/controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewByID);

app.patch("/api/reviews/:review_id", patchVotesByReviewID);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Invalid Path" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = app;
