BEGIN;

-- Insert new upcoming anime
INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('Classroom of the Elite Season 3', 'ようこそ実力至上主義の教室へ 3', 'https://example.com/cote.jpg', 'https://example.com/cote-cover.jpg', 'The psychological warfare continues at the Advanced Nurturing High School as Ayanokoji navigates through complex plots and unveils dark secrets.', 'upcoming', 13, 'spring', 2024, 4.7, 650),

('Black Butler: Public School Arc', '黒執事 公立学校編', 'https://example.com/black-butler.jpg', 'https://example.com/black-butler-cover.jpg', 'Ciel Phantomhive and Sebastian infiltrate a prestigious public school to investigate mysterious disappearances and supernatural occurrences.', 'upcoming', 12, 'summer', 2024, 4.6, 600);

-- Link new anime with genres
INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'Classroom of the Elite Season 3' AND g.name IN ('Drama', 'Psychological', 'Thriller');

INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'Black Butler: Public School Arc' AND g.name IN ('Mystery', 'Supernatural', 'Drama');

-- Link new anime with studios
INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'Classroom of the Elite Season 3' AND s.name = 'Madhouse';

INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'Black Butler: Public School Arc' AND s.name = 'A-1 Pictures';

COMMIT; 