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
            expect(reviews).toHaveProperty("review_id", 1);
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
  });
});
