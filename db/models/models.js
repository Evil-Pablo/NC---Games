const db = require("../connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewByID = (reviewID) => {
  return db
    .query(
      `
      SELECT reviews.*, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count FROM reviews 
      LEFT JOIN comments ON reviews.review_id = comments.review_id 
      WHERE reviews.review_id = $1 GROUP BY reviews.review_id;`,
      [reviewID]
    )
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Review does not exist" });
      }
      return rows[0];
    });
};

exports.updateVoteByReviewID = (reviewID, newVote) => {
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

exports.selectReviews = () => {
  return db
    .query(
      `
      SELECT reviews.*, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count FROM reviews 
      LEFT JOIN comments ON reviews.review_id = comments.review_id 
      GROUP BY reviews.review_id 
      ORDER BY reviews.created_at DESC;`
    )
    .then((reviews) => {
      return reviews.rows;
    });
};

exports.insertCommentByReviewID = (reviewID, newComment) => {
  const { username, body } = newComment;
  // selectReviewByID(reviewID).then(() => {
  return db
    .query(
      `INSERT INTO comments
      (review_id, author, body) 
      VALUES 
      ($1, $2, $3)
      RETURNING *;`,
      [reviewID, username, body]
    )
    .then(({ rows, rowCount }) => {
      console.log("MODELS ROWCOUNT>>>>>>", rowCount);
      if (!rows) {
        return Promise.reject({ status: 404, msg: "Review does not exist" });
      }
      console.log("MODELS >>>>", rows[0]);

      return rows[0];
    });
  // });
};
