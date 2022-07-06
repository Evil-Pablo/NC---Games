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

exports.getReviewByID = (req, res, next) => {
  let reviewID = req.params.review_id;
  selectReviewByID(reviewID)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotesByReviewID = (req, res, next) => {
  let reviewID = req.params.review_id;
  let newVote = req.body.inc_votes;
  console.log("CONTROLLERS >>>>>", req.body);
  updateVoteByReviewID(reviewID, newVote)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
