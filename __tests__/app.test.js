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
            console.log(categories);
            const categoryKeys = Object.keys(categories[0]);
            expect(categoryKeys).toHaveLength(2);
            categories.forEach((category) => {
              expect(category).toHaveProperty("slug");
              expect(category).toHaveProperty("description");
            });
          });
      });
    });
  });
});
