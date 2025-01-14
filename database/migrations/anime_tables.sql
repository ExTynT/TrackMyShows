-- Create enum for anime status
CREATE TYPE anime_status AS ENUM ('airing', 'finished', 'upcoming');
CREATE TYPE anime_season AS ENUM ('winter', 'spring', 'summer', 'fall');

-- Create anime table
CREATE TABLE anime (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    japanese_title VARCHAR(255),
    image_url TEXT NOT NULL,
    cover_image_url TEXT,
    synopsis TEXT NOT NULL,
    status anime_status NOT NULL DEFAULT 'upcoming',
    episodes INTEGER,
    season anime_season,
    year INTEGER,
    rating DECIMAL(3,2),
    popularity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create genres table
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Create anime_genres junction table
CREATE TABLE anime_genres (
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (anime_id, genre_id)
);

-- Create studios table
CREATE TABLE studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT
);

-- Create anime_studios junction table
CREATE TABLE anime_studios (
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE,
    studio_id INTEGER REFERENCES studios(id) ON DELETE CASCADE,
    PRIMARY KEY (anime_id, studio_id)
);

-- Create characters table
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    japanese_name VARCHAR(100),
    image_url TEXT,
    description TEXT,
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE
);

-- Create reviews table for anime
CREATE TABLE anime_reviews (
    id SERIAL PRIMARY KEY,
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_anime_list table for tracking
CREATE TABLE user_anime_list (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    anime_id INTEGER REFERENCES anime(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch')),
    episodes_watched INTEGER DEFAULT 0,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, anime_id)
);

-- Add some initial genres
INSERT INTO genres (name) VALUES 
('Action'), ('Adventure'), ('Comedy'), ('Drama'), ('Fantasy'),
('Horror'), ('Mystery'), ('Romance'), ('Sci-Fi'), ('Slice of Life'),
('Sports'), ('Supernatural'), ('Thriller');

-- Add some initial studios
INSERT INTO studios (name) VALUES 
('MAPPA'), ('ufotable'), ('Kyoto Animation'), ('Wit Studio'), 
('A-1 Pictures'), ('Bones'), ('Madhouse'), ('Production I.G'); 