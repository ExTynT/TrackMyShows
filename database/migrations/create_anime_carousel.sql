-- Create anime_carousel table
CREATE TABLE IF NOT EXISTS anime_carousel (
    id SERIAL PRIMARY KEY,
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT,
    button_text VARCHAR(100) DEFAULT 'Watch Now',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial carousel slides
INSERT INTO anime_carousel (anime_id, title, description, cover_image_url) VALUES
(
    (SELECT id FROM anime WHERE title = 'Demon Slayer: Kimetsu no Yaiba'),
    'Demon Slayer: Kimetsu no Yaiba',
    'Experience the breathtaking journey of Tanjiro Kamado, a young demon slayer who seeks to turn his sister back to human and avenge his family. With stunning animation and intense action, this series redefines the boundaries of anime storytelling.',
    'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/DS.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvRFMuanBnIiwiaWF0IjoxNzM2ODY1MzY3LCJleHAiOjE3Njg0MDE1MjB9.Wd_7Gy_9Ug_2nOxqpkHVHXgQxwqVQxLxvbEGHEFcxQE&t=2025-01-14T14%3A38%3A40.451Z'
),
(
    (SELECT id FROM anime WHERE title = 'Jujutsu Kaisen'),
    'Jujutsu Kaisen',
    'Dive into a world where curses run rampant and sorcerers must master the art of Cursed Energy. Follow Yuji Itadori as he joins Tokyo Metropolitan Curse Technical School and faces supernatural threats that could destroy humanity.',
    'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/JJK.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvSkpLLmpwZyIsImlhdCI6MTczNjg2NTM5MCwiZXhwIjoxNzY4NDAxNTIwfQ.Wd_7Gy_9Ug_2nOxqpkHVHXgQxwqVQxLxvbEGHEFcxQE&t=2025-01-14T14%3A38%3A40.451Z'
),
(
    (SELECT id FROM anime WHERE title = 'One Piece'),
    'One Piece',
    'Join Monkey D. Luffy and his diverse crew on their epic quest to find the legendary One Piece treasure. This long-running series combines adventure, friendship, and spectacular battles in a unique world of pirates and mystery.',
    'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/OP.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvT1AuanBnIiwiaWF0IjoxNzM2ODY1NDEzLCJleHAiOjE3Njg0MDE1MjB9.Wd_7Gy_9Ug_2nOxqpkHVHXgQxwqVQxLxvbEGHEFcxQE&t=2025-01-14T14%3A38%3A40.451Z'
); 