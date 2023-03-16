const db = require('../db');

class GenreController {

  async createGenre(req, res) {

    const {genre_name} = req.body;
    const newGenre = await db.query(`INSERT INTO genre (genre_name) values ($1) RETURNING *`, [genre_name]);
    res.send(newGenre.rows[0]);

  }

  async getGenres(req, res) {

    if(req.params.id) {
      const id = req.params.id;
      const genre = await db.query(`SELECT * FROM genre WHERE id = $1`, [id]);
      res.send(genre.rows[0]);
    }

    const genres = await db.query(`SELECT * FROM genre`);
    res.send(genres.rows);

  }

  async updateGenre(req, res) {

    const {id, genre_name} = req.body;
    const genre = await db.query(`UPDATE genre SET genre_name = $1 WHERE id = $2 RETURNING *`, [genre_name, id]);
    res.send(genre.rows[0]);

  }

  async deleteGenre(req, res) {

    const id = req.params.id;
    const genre = await db.query(`DELETE FROM genre WHERE id = $1 RETURNING *`, [id]);
    res.send(genre.rows[0]);

  }

}

module.exports = new GenreController();