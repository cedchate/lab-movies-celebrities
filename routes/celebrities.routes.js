const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
})

router.post('/create', async (req, res, next) => {
    console.log(req.body);
    const celebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
    try {
        await Celebrity.create(celebrity);
        res.redirect('/celebrities');
    } catch (error) {
        res.render('celebrities/new-celebrity')
    }
})

router.get('/', async (req, res) => {
    try {
        const allCelebrities= await Celebrity.find();
        res.render('celebrities/celebrities', { allCelebrities })
    } catch (error) {
        next(error);
    }
})
module.exports = router;