const db = require("../connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewByID = (reviewID) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [reviewID])
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((users) => {
    // console.log("MODELS>>>>>", users.rows);
    return users.rows;
  });
};
