const cors = require("cors");
const express = require("express");
const app = express();
const {
  getCategories,
  getReviewByID,
  patchVotesByReviewID,
  getUsers,
  getReviews,
  postCommentByReviewID,
} = require("./db/controllers/controllers");

app.use(cors());

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewByID);

app.patch("/api/reviews/:review_id", patchVotesByReviewID);

app.get("/api/users", getUsers);

app.get("/api/reviews", getReviews);

app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Invalid Path" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input data" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Input does not exist" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = app;
