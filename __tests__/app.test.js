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
            console.log(Object.keys(reviews));
            const reviewKeys = Object.keys(reviews);
            expect(reviewKeys).toHaveLength(9);
            expect(reviews).toHaveProperty("review_id");
            expect(reviews).toHaveProperty("title");
            expect(reviews).toHaveProperty("review_body");
            expect(reviews).toHaveProperty("designer");
            expect(reviews).toHaveProperty("review_img_url");
            expect(reviews).toHaveProperty("votes");
            expect(reviews).toHaveProperty("category");
            expect(reviews).toHaveProperty("owner");
            expect(reviews).toHaveProperty("created_at");
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
