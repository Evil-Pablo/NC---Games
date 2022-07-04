const { selectCategories, selectReviewByID } = require("../models/models");

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
