-- Add new authors first
INSERT INTO "public"."manga_authors" (id, name, japanese_name) VALUES
(6, 'Tatsuki Fujimoto', '藤本タツキ'),
(7, 'Muneyuki Kaneshiro', '金城宗幸'),
(8, 'Yusuke Nomura', '野村優介'),
(9, 'Chugong', null),
(10, 'Tatsuya Endo', '遠藤達哉');

-- Then add manga entries
INSERT INTO "public"."manga" (id, title, synopsis, chapters, volumes, status, year, image_url) VALUES
(6, 'Chainsaw Man', 'Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. However, this is far from reality as he is forced to kill devils to repay his crushing debts.', 129, 14, 'ongoing', 2018, 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/MANGA/chainsaw-man.jpg'),
(7, 'Blue Lock', 'After a disastrous defeat at the 2018 World Cup, Japan''s team struggles to regroup. The Japanese Football Association hires the enigmatic Ego Jinpachi, who creates a radical new training program called Blue Lock.', 207, 22, 'ongoing', 2018, 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/MANGA/blue-lock.jpg'),
(8, 'Solo Leveling', 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jin-Woo begins as the weakest of hunters but undergoes a mysterious transformation.', 179, 14, 'ongoing', 2018, 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/MANGA/solo-leveling.jpg'),
(9, 'Spy x Family', 'A spy, an assassin, and a telepath come together to form a family where each must keep their identity secret, while working to maintain world peace.', 70, 10, 'ongoing', 2019, 'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/MANGA/spy-x-family.jpg');

-- Then add genre relations
INSERT INTO "public"."manga_genre_relations" (manga_id, genre_id) VALUES
(6, 1), -- Action
(6, 2), -- Adventure
(6, 7), -- Horror
(7, 1), -- Action
(7, 8), -- Sports
(7, 9), -- Drama
(8, 1), -- Action
(8, 2), -- Adventure
(8, 4), -- Fantasy
(9, 1), -- Action
(9, 9), -- Drama
(9, 10); -- Comedy

-- Finally add author relations
INSERT INTO "public"."manga_author_relations" (manga_id, author_id, role) VALUES
(6, 6, 'Story & Art'),
(7, 7, 'Story'),
(7, 8, 'Art'),
(8, 9, 'Story & Art'),
(9, 10, 'Story & Art'); 