const db = require("../connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewByID = (reviewID) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [reviewID])
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Review does not exist" });
      }
      return rows[0];
    });
};

exports.updateVoteByReviewID = (reviewID, newVote) => {
  return db
    .query(
      "UPDATE reviews SET votes = votes + $2 WHERE review_id = $1 RETURNING *;",
      [reviewID, newVote]
    )
    .then((result) => {
      return result.rows[0];
    });
};
