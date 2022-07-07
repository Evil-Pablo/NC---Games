const db = require("../connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewByID = (reviewID) => {
  return db
    .query(
      "SELECT reviews.*, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id;",
      [reviewID]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((users) => {
    return users.rows;
  });
};

// SELECT reviews.*, COUNT(*) AS comment_count FROM reviews
//     LEFT JOIN comments ON reviews.review_id = comments.review_id
//     WHERE reviews.review_id = 2
//     GROUP BY reviews.review_id;
