BEGIN;

-- Insert sample anime
INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('Demon Slayer: Kimetsu no Yaiba', '鬼滅の刃', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/demon_slayer_4.webp', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/d_s_carousel.jpg', 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to turn his sister back into a human and to avenge his family.', 'airing', 24, 'spring', 2024, 4.8, 1000) RETURNING id;

INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('Jujutsu Kaisen', '呪術廻戦', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/jjk_2.avif', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/jjk_2.avif', 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman''s school to be able to locate the demon''s other body parts and thus exorcise himself.', 'finished', 24, 'fall', 2023, 4.9, 950) RETURNING id;

INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('One Piece', 'ワンピース', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/one_piece_carousle.avif', 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/one_piece_carousle.avif', 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".', 'airing', 1000, 'winter', 2024, 4.7, 900) RETURNING id;

INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('Attack on Titan', '進撃の巨人', 'https://example.com/aot.jpg', 'https://example.com/aot-cover.jpg', 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, giant humanoid creatures who devour humans seemingly without reason, a young boy aims to seek revenge by joining the military.', 'finished', 87, 'winter', 2023, 4.9, 980) RETURNING id;

INSERT INTO anime (title, japanese_title, image_url, cover_image_url, synopsis, status, episodes, season, year, rating, popularity) VALUES
('My Hero Academia', '僕のヒーローアカデミア', 'https://example.com/mha.jpg', 'https://example.com/mha-cover.jpg', 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.', 'airing', 25, 'spring', 2024, 4.5, 850) RETURNING id;

-- Add some initial genres (if not already present)
INSERT INTO genres (name) VALUES 
('Action'), ('Adventure'), ('Comedy'), ('Drama'), ('Fantasy'),
('Horror'), ('Mystery'), ('Romance'), ('Sci-Fi'), ('Slice of Life'),
('Sports'), ('Supernatural'), ('Thriller')
ON CONFLICT (name) DO NOTHING;

-- Add some initial studios (if not already present)
INSERT INTO studios (name) VALUES 
('MAPPA'), ('ufotable'), ('Kyoto Animation'), ('Wit Studio'), 
('A-1 Pictures'), ('Bones'), ('Madhouse'), ('Production I.G')
ON CONFLICT (name) DO NOTHING;

-- Link anime with genres using subqueries
INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'Demon Slayer: Kimetsu no Yaiba' AND g.name IN ('Action', 'Fantasy', 'Supernatural');

INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'Jujutsu Kaisen' AND g.name IN ('Action', 'Supernatural', 'Thriller');

INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'One Piece' AND g.name IN ('Action', 'Adventure', 'Comedy');

INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'Attack on Titan' AND g.name IN ('Action', 'Drama', 'Thriller');

INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id
FROM anime a, genres g
WHERE a.title = 'My Hero Academia' AND g.name IN ('Action', 'Adventure', 'Drama');

-- Link anime with studios using subqueries
INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'Demon Slayer: Kimetsu no Yaiba' AND s.name = 'ufotable';

INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'Jujutsu Kaisen' AND s.name = 'MAPPA';

INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'One Piece' AND s.name = 'Bones';

INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'Attack on Titan' AND s.name = 'MAPPA';

INSERT INTO anime_studios (anime_id, studio_id)
SELECT a.id, s.id
FROM anime a, studios s
WHERE a.title = 'My Hero Academia' AND s.name = 'A-1 Pictures';

-- Insert sample characters using subqueries
INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Tanjiro Kamado', '竈門炭治郎', 'https://example.com/tanjiro.jpg', 
       'The main protagonist who becomes a demon slayer after his family is slaughtered and his sister turned into a demon.',
       id
FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba';

INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Nezuko Kamado', '竈門禰豆子', 'https://example.com/nezuko.jpg',
       'Tanjiro''s sister who was turned into a demon but still retains some of her human consciousness.',
       id
FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba';

INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Yuji Itadori', '虎杖悠仁', 'https://example.com/yuji.jpg',
       'A high school student who becomes the host of a powerful Curse named Sukuna.',
       id
FROM anime WHERE title = 'Jujutsu Kaisen';

INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Megumi Fushiguro', '伏黒恵', 'https://example.com/megumi.jpg',
       'A serious young man with the ability to summon various shikigami.',
       id
FROM anime WHERE title = 'Jujutsu Kaisen';

INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Monkey D. Luffy', 'モンキー・D・ルフィ', 'https://example.com/luffy.jpg',
       'A young pirate with the power of the Gum-Gum Fruit, aspiring to become the King of the Pirates.',
       id
FROM anime WHERE title = 'One Piece';

INSERT INTO characters (name, japanese_name, image_url, description, anime_id)
SELECT 'Roronoa Zoro', 'ロロノア・ゾロ', 'https://example.com/zoro.jpg',
       'A skilled swordsman who uses three swords and aims to become the world''s greatest swordsman.',
       id
FROM anime WHERE title = 'One Piece';

COMMIT; 