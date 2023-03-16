const Application = require('./framework/Application');
const filmRouter = require('./routes/film_routes');
const genreRouter = require('./routes/genre_routes');
const jsonParser = require('./framework/parseJson');
const urlParser = require('./framework/parseUrl');


const PORT = 3000;

const app = new Application();

app.use(jsonParser);
app.use(urlParser(`http://localhost:${PORT}`));

app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})