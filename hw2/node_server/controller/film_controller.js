const db = require('../db');

class FilmController {

  async createFilm(req, res) {

    const {film_name, release_year, genres} = req.body;
    const newFilm = await db.query(`INSERT INTO film (film_name, release_year) values ($1, $2) RETURNING *`, [film_name, release_year]);

    const id = newFilm.rows[0].id;
    
    for (const genre of genres) {
      await db.query(`INSERT INTO film_genre (film_id, genre_id) values ($1, $2) RETURNING *`, [id, genre]);
    }
    newFilm.rows[0].genres = genres;
    res.send(newFilm.rows[0]);

  }


  async getFilms(req, res) {

    if(req.params.id) {
      const id = req.params.id;
      const film = await db.query(`SELECT * FROM film WHERE id = $1`, [id]);

      const genres = [];
      const filmGenres = await db.query(`SELECT genre_id FROM film_genre WHERE film_id = $1`, [id]);

      for (const genre of filmGenres.rows) {
        const genreName = await db.query(`SELECT genre_name FROM genre WHERE id = $1`, [genre.genre_id]);
        genres.push(genreName.rows[0].genre_name);
      }
      
      film.rows[0].genres = genres;

      res.send(film.rows[0]);
    }

    const films = await db.query(`SELECT * FROM film`);

    for (const film of films.rows) {
      const id = film.id;
      const genres = [];
      const filmGenres = await db.query(`SELECT genre_id FROM film_genre WHERE film_id = $1`, [id]);

      for (const genre of filmGenres.rows) {
        const genreName = await db.query(`SELECT genre_name FROM genre WHERE id = $1`, [genre.genre_id]);
        genres.push(genreName.rows[0].genre_name);
      }

      film.genres = genres;
    }

    res.send(films.rows);

  }


  async updateFilm(req, res) {

    const {id, film_name, release_year, genres} = req.body;
    const film = await db.query(`UPDATE film SET film_name = $1, release_year = $2 WHERE id = $3 RETURNING *`,
      [film_name, release_year, id]);

    if (genres) {

      await db.query(`DELETE FROM film_genre WHERE film_id = $1`, [id]);

      for (const genre of genres) {
        await db.query(`INSERT INTO film_genre (film_id, genre_id) values ($1, $2)`, [id, genre]);
      }
      film.rows[0].genres = genres;

    }
    
    res.send(film.rows[0]);

  }


  async deleteFilm(req, res) {

    const id = req.params.id;
    const film = await db.query(`DELETE FROM film WHERE id = $1 RETURNING *`, [id]);

    res.send(film.rows[0]);

  }

}

module.exports = new FilmController();