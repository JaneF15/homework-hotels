const Router = require('../framework/Router');
const controller = require('../controller/genre_controller');

const router = new Router();

router.get('/genres', controller.getGenres);

router.post('/genres', controller.createGenre);

router.put('/genres', controller.updateGenre);

router.delete('/genres', controller.deleteGenre);

module.exports = router