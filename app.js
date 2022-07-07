const express = require("express");
const app = express();
const {
  getCategories,
  getReviewByID,
  patchVotesByReviewID,
  getUsers,
  getCommentsByReviewID,
} = require("./db/controllers/controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewByID);

app.patch("/api/reviews/:review_id", patchVotesByReviewID);

app.get("/api/users", getUsers);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Invalid Path" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input data" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server Error" });
});

module.exports = app;
