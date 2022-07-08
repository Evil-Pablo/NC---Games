\c nc_games_test

INSERT INTO comments
(review_id, author, body) 
VALUES 
((SELECT review_id FROM reviews WHERE review_id=1),
(SELECT username FROM users WHERE username='mallionaire'), 'test comment')
RETURNING *;

-- WHERE EXISTS (SELECT review_id FROM reviews WHERE review_id=0)
-- INSERT INTO comments
-- (review_id)
-- VALUES
-- (0)
-- RETURNING *;
