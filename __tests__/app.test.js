const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => db.end());

describe("app tests", () => {
  describe("app Hppy Path", () => {
    describe("GET /api/categories", () => {
      test("200: responds with a body of categories", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({ body: { categories } }) => {
            const categoryKeys = Object.keys(categories[0]);
            expect(categoryKeys).toHaveLength(2);
            categories.forEach((category) => {
              expect(category).toHaveProperty("slug");
              expect(category).toHaveProperty("description");
            });
          });
      });
    });
    describe("GET /api/reviews/:review_id", () => {
      test("200: responds with review object passed by user", () => {
        const REVIEW_ID = 1;
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}`)
          .expect(200)
          .then(({ body: { reviews } }) => {
            expect(reviews).toHaveProperty("review_id", REVIEW_ID);
            expect(reviews).toHaveProperty("title", "Agricola");
            expect(reviews).toHaveProperty("designer", "Uwe Rosenberg");
            expect(reviews).toHaveProperty("owner", "mallionaire");
            expect(reviews).toHaveProperty(
              "review_img_url",
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
            );
            expect(reviews).toHaveProperty("review_body", "Farmyard fun!");
            expect(reviews).toHaveProperty("category", "euro game");
            expect(reviews).toHaveProperty(
              "created_at",
              "2021-01-18T10:00:20.514Z"
            );
            expect(reviews).toHaveProperty("votes", 1);
            expect(reviews).toHaveProperty("comment_count");
            expect(typeof reviews.comment_count).toBe("number");
          });
      });
      test("200: comment count works for multiple comments", () => {
        const REVIEW_ID = 2;
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}`)
          .expect(200)
          .then(({ body: { reviews } }) => {
            expect(reviews).toHaveProperty("comment_count", 3);
          });
      });
    });
    describe("PATCH /api/reviews/:review_id", () => {
      test("200: responds with updated review object where vote is incremented by newVote value", () => {
        const REVIEW_ID = 1;
        const VOTE_INCREMENT = { inc_votes: 2 };
        return request(app)
          .patch(`/api/reviews/${REVIEW_ID}`)
          .send(VOTE_INCREMENT)
          .expect(200)
          .then(({ body: { reviews } }) => {
            expect(reviews).toEqual({
              review_id: REVIEW_ID,
              title: "Agricola",
              designer: "Uwe Rosenberg",
              owner: "mallionaire",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "Farmyard fun!",
              category: "euro game",
              created_at: "2021-01-18T10:00:20.514Z",
              votes: 3,
            });
          });
      });
    });
    describe("GET /api/users", () => {
      test("200: responds with an array of users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            const userKeys = Object.keys(users[0]);
            expect(userKeys).toHaveLength(3);
            users.forEach((user) => {
              expect(user).toHaveProperty("username");
              expect(user).toHaveProperty("name");
              expect(user).toHaveProperty("avatar_url");
            });
          });
      });
    });

    describe("GET /api/reviews/:review_id/comments", () => {
      test("200: responds with all comments for the specified review", () => {
        const REVIEW_ID = 2;
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}/comments`)
          .expect(200)
          .then(({ body: { comments } }) => {
            console.log(comments);
            const commentKeys = Object.keys(comments[0]);
            expect(commentKeys).toHaveLength(6);
            comments.forEach((comment) => {
              expect(comment).toHaveProperty("comment_id");
              expect(comment).toHaveProperty("body");
              expect(comment).toHaveProperty("review_id", REVIEW_ID);
              expect(comment).toHaveProperty("author");
              expect(comment).toHaveProperty("votes");
              expect(comment).toHaveProperty("created_at");
            });

    describe("GET /api/reviews", () => {
      test("200: responds with reviews sorted by date in descending order", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then(({ body: { reviews } }) => {
            const reviewKeys = Object.keys(reviews[0]);
            expect(reviewKeys).toHaveLength(10);
            reviews.forEach((review) => {
              expect(review).toHaveProperty("owner");
              expect(review).toHaveProperty("title");
              expect(review).toHaveProperty("review_id");
              expect(review).toHaveProperty("category");
              expect(review).toHaveProperty("review_img_url");
              expect(review).toHaveProperty("created_at");
              expect(review).toHaveProperty("votes");
              expect(review).toHaveProperty("review_body");
              expect(review).toHaveProperty("designer");
              expect(review).toHaveProperty("comment_count");
            });
            expect(reviews).toBeSortedBy("created_at", { descending: true });

          });
      });
    });
  });
  describe("app Sad Path", () => {
    describe("badpath", () => {
      test("404: invalidpath", () => {
        return request(app)
          .get("/invalid-path")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid Path");
          });
      });
    });
    describe("/api/reviews/:review_id", () => {
      test("404: ID doesn't exist", () => {
        const REVIEW_ID = 0;
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}`)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Review does not exist");
          });
      });

      test("400: Review ID datatype invalid", () => {
        const REVIEW_ID = "invalidID";
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input data");
          });
      });
      test("404: ID doesn't exist", () => {
        const REVIEW_ID = 0;
        const VOTE_INCREMENT = { inc_votes: 2 };
        return request(app)
          .patch(`/api/reviews/${REVIEW_ID}`)
          .send(VOTE_INCREMENT)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Review does not exist");
          });
      });
      test("400: invalid input data", () => {
        const REVIEW_ID = 1;
        const VOTE_INCREMENT = { inc_votes: "two" };
        return request(app)
          .patch(`/api/reviews/${REVIEW_ID}`)
          .send(VOTE_INCREMENT)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input data");
          });
      });
      test("400: invalid key on input data", () => {
        const REVIEW_ID = 1;
        const VOTE_INCREMENT = { wrong_key: 1 };
        return request(app)
          .patch(`/api/reviews/${REVIEW_ID}`)
          .send(VOTE_INCREMENT)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input data");
          });
      });
      test("400: Review ID datatype invalid", () => {
        const REVIEW_ID = "invalidID";
        return request(app)
          .patch(`/api/reviews/${REVIEW_ID}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input data");
          });
      });
    });

    describe("GET /api/reviews/:review_id/comments", () => {
      test("400: Review ID datatype invalid", () => {
        const REVIEW_ID = "invalidID";
        return request(app)
          .get(`/api/reviews/${REVIEW_ID}/comments`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid input data");
          });
      });
    });
  });
});
