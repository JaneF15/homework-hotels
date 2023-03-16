CREATE TABLE film
(
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    film_name text NOT NULL,
    release_year integer
);

CREATE TABLE genre
(
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name text NOT NULL
);

CREATE TABLE film_genre
(
    film_id bigint REFERENCES film (id) ON DELETE CASCADE,
    genre_id bigint REFERENCES genre (id) ON DELETE CASCADE,
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id)
);