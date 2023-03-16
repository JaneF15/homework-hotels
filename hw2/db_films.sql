CREATE TABLE actor
(
    id_actor bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    actor_name text NOT NULL
);

CREATE TABLE country
(
    id_country integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country_name text NOT NULL
);

CREATE TABLE film
(
    id_film bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    film_name text NOT NULL,
    release_year smallint,
    country_origin integer,
    duration_minute smallint,
    slogan text,
    rating real,
    age_limit smallint,
    world_premiere date,
    world_fees_dollar bigint,
    budget_dollar bigint,
    CONSTRAINT country_fkey FOREIGN KEY (country_origin)
        REFERENCES country (id_country)
);

CREATE TABLE genre
(
    id_genre integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name text NOT NULL
);

--для упрощения храним в award_name полное название награды с номинацией, например,
-- Золотой глобус, лучшая женская роль второго плана
CREATE TABLE award
(
    id_award integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    award_name text NOT NULL
);

CREATE TABLE person
(
    id_person bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person_name text NOT NULL
);

CREATE TABLE profession
(
    id_profession integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profession_name text NOT NULL
);

CREATE TABLE voice_actor
(
    id_voice_actor integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    voice_actor_name text NOT NULL
);

CREATE TABLE person_profession
(
    person_id bigint,
    profession_id integer,
    CONSTRAINT person_profession_pkey PRIMARY KEY (person_id, profession_id),
    CONSTRAINT person_fkey FOREIGN KEY (person_id)
        REFERENCES person (id_person),
    CONSTRAINT profession_fkey FOREIGN KEY (profession_id)
        REFERENCES profession (id_profession)
);

CREATE TABLE film_audience
(
    film_id bigint,
    country_id integer,
    audience_size bigint NOT NULL,
    CONSTRAINT film_audience_pkey PRIMARY KEY (film_id, country_id),
    CONSTRAINT country_fkey FOREIGN KEY (country_id)
        REFERENCES country (id_country),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film)
);

CREATE TABLE film_dubbing
(
    film_id bigint,
    voice_actor_id integer,
    CONSTRAINT film_dubbing_pkey PRIMARY KEY (film_id, voice_actor_id),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film),
    CONSTRAINT voice_actor_fkey FOREIGN KEY (voice_actor_id)
        REFERENCES voice_actor (id_voice_actor)
);

CREATE TABLE film_genre
(
    film_id bigint,
    genre_id integer,
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film),
    CONSTRAINT genre_fkey FOREIGN KEY (genre_id)
        REFERENCES genre (id_genre)
);

--храним только победителей, без номинантов
CREATE TABLE film_award
(
    film_id bigint,
    award_id integer,
    year_award integer NOT NULL,
    CONSTRAINT film_award_pkey PRIMARY KEY (film_id, award_id, year_award),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film),
    CONSTRAINT award_fkey FOREIGN KEY (award_id)
        REFERENCES award (id_award)
);

CREATE TABLE film_main_role
(
    film_id bigint,
    actor_id bigint,
    CONSTRAINT film_main_role_pkey PRIMARY KEY (film_id, actor_id),
    CONSTRAINT actor_fkey FOREIGN KEY (actor_id)
        REFERENCES actor (id_actor),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film)
);

CREATE TABLE film_person
(
    film_id bigint,
    person_profession_id_profession integer,
    person_profession_id_person bigint,
    CONSTRAINT film_person_pkey PRIMARY KEY (film_id, person_profession_id_profession),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES film (id_film),
    CONSTRAINT person_profession_fkey FOREIGN KEY (person_profession_id_person, person_profession_id_profession)
        REFERENCES person_profession (person_id, profession_id)
);