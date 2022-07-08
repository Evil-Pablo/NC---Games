const {
  selectCategories,
  selectReviewByID,
  updateVoteByReviewID,
  selectUsers,
  selectCommentsByReviewID,
  selectReviews,
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


exports.getCommentsByReviewID = (req, res, next) => {
  let reviewID = req.params.review_id;
  selectCommentsByReviewID(reviewID)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });

exports.getReviews = (req, res) => {
  selectReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};
