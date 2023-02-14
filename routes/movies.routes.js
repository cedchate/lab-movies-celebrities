const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");


// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/create', async (req, res) => {
    try {
        const celebrities= await Celebrity.find();
        res.render('movies/new-movie', {celebrities});
    } catch (error) {
        next(error);
    }
})
router.post('/create', async (req, res, next) => {
    console.log(req.body)
    const movie= {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    try {
        await Movie.create(movie);
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
})
router.get('/', async (req, res, next) => {
    try {
        const allMovies= await Movie.find();
        res.render('movies/movies', { allMovies })
    } catch (error) {
        next(error);
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const movie= await Movie.findById(req.params.id);
        movie.casting =[];
        movie.cast.forEach(async (el) => {
            const celebrity= await Celebrity.findById(el);
            movie.casting.push(celebrity);
        })
        res.render('movies/movie-details', {movie});
    } catch (error) {
        next(error);
    }
})
router.post('/:id', async (req, res, next) => {
    try {
        const updated= await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.redirect(`/movies/${req.params.id}`)
    } catch (error) {
        next(error);
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const movie= await Movie.findById(req.params.id);
        const celebrities= await Celebrity.find();
        res.render('movies/edit-movie', { movie, celebrities});
    } catch (error) {
        next(error);
    }
})
module.exports = router;