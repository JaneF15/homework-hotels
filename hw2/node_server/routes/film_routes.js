const Router = require('../framework/Router');
const controller = require('../controller/film_controller');

const router = new Router();

router.get('/films', controller.getFilms);

router.post('/films', controller.createFilm);

router.put('/films', controller.updateFilm);

router.delete('/films', controller.deleteFilm);

module.exports = router