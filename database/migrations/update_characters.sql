BEGIN;

-- Demon Slayer characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Tanjiro Kamado', '竈門炭治郎', 'The main protagonist who becomes a demon slayer after his family is killed and his sister turned into a demon. Kind-hearted and determined.', (SELECT id FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba')),
('Nezuko Kamado', '竈門禰豆子', 'Tanjiro''s sister who was turned into a demon but retained her human emotions. She helps her brother fight demons.', (SELECT id FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba')),
('Zenitsu Agatsuma', '我妻善逸', 'A cowardly demon slayer who shows his true strength when he falls asleep. Specializes in Thunder Breathing.', (SELECT id FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba'));

-- Jujutsu Kaisen characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Yuji Itadori', '虎杖悠仁', 'The main protagonist who becomes a vessel for Sukuna. Despite his immense power, he maintains his strong moral compass.', (SELECT id FROM anime WHERE title = 'Jujutsu Kaisen')),
('Megumi Fushiguro', '伏黒恵', 'A serious and talented jujutsu sorcerer who uses Shadow Beast Technique. Comes from the prestigious Zen''in family.', (SELECT id FROM anime WHERE title = 'Jujutsu Kaisen')),
('Nobara Kugisaki', '釘崎野薔薇', 'A confident and skilled jujutsu sorcerer who uses hammer and nails in combat. Values both strength and femininity.', (SELECT id FROM anime WHERE title = 'Jujutsu Kaisen'));

-- One Piece characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Monkey D. Luffy', 'モンキー・D・ルフィ', 'The captain of the Straw Hat Pirates who dreams of becoming the Pirate King. Has the power of the Gum-Gum Fruit.', (SELECT id FROM anime WHERE title = 'One Piece')),
('Roronoa Zoro', 'ロロノア・ゾロ', 'The first mate of the Straw Hat Pirates and a master swordsman who aims to become the world''s greatest swordsman.', (SELECT id FROM anime WHERE title = 'One Piece')),
('Nami', 'ナミ', 'The navigator of the Straw Hat Pirates. A skilled cartographer and thief with a dream to map the entire world.', (SELECT id FROM anime WHERE title = 'One Piece'));

-- My Hero Academia characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Izuku Midoriya', '緑谷出久', 'The main protagonist who dreams of becoming a hero despite being born without a Quirk. Inherits One For All from All Might.', (SELECT id FROM anime WHERE title = 'My Hero Academia')),
('Katsuki Bakugo', '爆豪勝己', 'Midoriya''s childhood friend and rival with an explosive personality and Quirk to match.', (SELECT id FROM anime WHERE title = 'My Hero Academia')),
('Ochaco Uraraka', '麗日お茶子', 'A student at U.A. High School with the power to manipulate gravity. Aspires to become a hero to support her family.', (SELECT id FROM anime WHERE title = 'My Hero Academia'));

-- Attack on Titan characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Eren Yeager', 'エレン・イェーガー', 'The protagonist who swears to eliminate all Titans after witnessing his mother''s death. Possesses the power of the Attack Titan.', (SELECT id FROM anime WHERE title = 'Attack on Titan')),
('Mikasa Ackerman', 'ミカサ・アッカーマン', 'Eren''s adopted sister and a prodigious soldier. Extremely skilled in combat and deeply protective of Eren.', (SELECT id FROM anime WHERE title = 'Attack on Titan')),
('Armin Arlert', 'アルミン・アルレルト', 'Eren and Mikasa''s childhood friend. A brilliant strategist who often compensates for his lack of physical strength with intelligence.', (SELECT id FROM anime WHERE title = 'Attack on Titan'));

-- Solo Leveling characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Sung Jin-Woo', '성진우', 'Initially the weakest hunter who becomes increasingly powerful through the mysterious System. Known as the Shadow Monarch.', (SELECT id FROM anime WHERE title = 'Solo Leveling')),
('Cha Hae-In', '차해인', 'One of the strongest hunters in Korea. Known for her exceptional combat skills and keen sense of smell.', (SELECT id FROM anime WHERE title = 'Solo Leveling')),
('Go Gun-Hee', '고건희', 'The chairman of the Korean Hunters Association. A powerful S-rank hunter who recognizes Jin-Woo''s potential.', (SELECT id FROM anime WHERE title = 'Solo Leveling'));

-- Kaiju No. 8 characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Kafka Hibino', '日比野カフカ', 'A member of the Defense Force who gains the ability to transform into a kaiju. Dreams of protecting Japan from kaiju threats.', (SELECT id FROM anime WHERE title = 'Kaiju No. 8')),
('Mina Ashiro', '芦戸ミナ', 'A childhood friend of Kafka and the youngest person to become a Defense Force captain.', (SELECT id FROM anime WHERE title = 'Kaiju No. 8')),
('Reno Ichikawa', '市川レノ', 'A talented member of the Defense Force who becomes Kafka''s friend and ally.', (SELECT id FROM anime WHERE title = 'Kaiju No. 8'));

-- Mashle characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Mash Burnedead', 'マッシュ・バーンデッド', 'A young man born without magic in a world where magic is everything. Relies on his incredible physical strength.', (SELECT id FROM anime WHERE title = 'Mashle: Magic and Muscles Season 2')),
('Finn Ames', 'フィン・エイムズ', 'Mash''s friend and roommate at magic school. Skilled at magic and often explains magical concepts to Mash.', (SELECT id FROM anime WHERE title = 'Mashle: Magic and Muscles Season 2')),
('Lance Crown', 'ランス・クラウン', 'A talented student and rival to Mash. Initially antagonistic but grows to respect Mash''s strength.', (SELECT id FROM anime WHERE title = 'Mashle: Magic and Muscles Season 2'));

-- Blue Exorcist characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Rin Okumura', '奥村燐', 'The son of Satan who decides to become an exorcist. Possesses powerful blue flames and a strong sense of justice.', (SELECT id FROM anime WHERE title = 'Blue Exorcist Season 3')),
('Yukio Okumura', '奥村雪男', 'Rin''s younger twin brother and a prodigious exorcist. Already a teacher at True Cross Academy despite his age.', (SELECT id FROM anime WHERE title = 'Blue Exorcist Season 3')),
('Shiemi Moriyama', '杜山しえみ', 'A shy student studying to become an exorcist. Has the ability to summon a greenman familiar named Nii.', (SELECT id FROM anime WHERE title = 'Blue Exorcist Season 3'));

-- Classroom of the Elite characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Kiyotaka Ayanokoji', '綾小路清隆', 'The mysterious protagonist with exceptional intelligence and manipulation skills. Prefers to remain in the background.', (SELECT id FROM anime WHERE title = 'Classroom of the Elite Season 3')),
('Suzune Horikita', '堀北鈴音', 'A studious and ambitious student aiming for Class A. Initially cold but gradually opens up to others.', (SELECT id FROM anime WHERE title = 'Classroom of the Elite Season 3')),
('Kei Karuizawa', '軽井沢恵', 'A popular student who becomes closely involved with Ayanokoji''s plans. Has a complex past and hidden depths.', (SELECT id FROM anime WHERE title = 'Classroom of the Elite Season 3'));

-- Black Butler characters
INSERT INTO characters (name, japanese_name, description, anime_id) VALUES
('Ciel Phantomhive', 'シエル・ファントムハイヴ', 'The young head of the Phantomhive family and the Queen''s Watchdog. Made a contract with Sebastian for revenge.', (SELECT id FROM anime WHERE title = 'Black Butler: Public School Arc')),
('Sebastian Michaelis', 'セバスチャン・ミカエリス', 'A demon butler bound by contract to serve Ciel. Incredibly capable and always maintains a perfect butler aesthetic.', (SELECT id FROM anime WHERE title = 'Black Butler: Public School Arc')),
('Edward Midford', 'エドワード・ミッドフォード', 'Elizabeth''s older brother and a prefect at Weston College. Skilled swordsman and protective of his family''s honor.', (SELECT id FROM anime WHERE title = 'Black Butler: Public School Arc'));

COMMIT; 