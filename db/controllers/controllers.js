const {
  selectCategories,
  selectReviewByID,
  updateVoteByReviewID,
  selectUsers,
  selectReviews,
  insertCommentByReviewID,
} = require("../models/models");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

exports.getReviewByID = (req, res, next) => {
  let reviewID = req.params.review_id;
  selectReviewByID(reviewID)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotesByReviewID = (req, res, next) => {
  let reviewID = req.params.review_id;
  let newVote = req.body.inc_votes;
  updateVoteByReviewID(reviewID, newVote)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getReviews = (req, res) => {
  selectReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};

exports.postCommentByReviewID = (req, res, next) => {
  let reviewID = req.params.review_id;
  let newComment = req.body;
  insertCommentByReviewID(reviewID, newComment)
    .then((comments) => {
      console.log("CONTROLLER>>>>", comments);
      res.status(201).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
