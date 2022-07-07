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
  console.log(newVote);
  if (!newVote) {
    return Promise.reject({ status: 400, msg: "Invalid input data" });
  }
  return db
    .query(
      "UPDATE reviews SET votes = votes + $2 WHERE review_id = $1 RETURNING *;",
      [reviewID, newVote]
    )
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Review does not exist" });
      }
      return rows[0];
    });
};

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((users) => {
    return users.rows;
  });
};
