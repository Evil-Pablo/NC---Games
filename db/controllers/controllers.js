const {
  selectCategories,
  selectReviewByID,
  updateVoteByReviewID,
} = require("../models/models");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

exports.getReviewByID = (req, res) => {
  let reviewID = req.params.review_id;
  selectReviewByID(reviewID).then((reviews) => {
    res.status(200).send({ reviews });
  });
};

exports.patchVotesByReviewID = (req, res) => {
  let reviewID = req.params.review_id;
  let newVote = req.body.inc_votes;
  updateVoteByReviewID(reviewID, newVote).then((reviews) => {
    res.status(200).send({ reviews });
  });
};
