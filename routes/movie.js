const { Router } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieCtrl = require('../controllers/movieController');

//Récuperer films avec un ou plusieurs themes
router.post('/theme/',movieCtrl.getMoviesByThemes); 
//Récuper films avec un theme
router.get('/theme/:theme',movieCtrl.getMoviesByTheme);
router.get('/stars/:stars',movieCtrl.getMovieByStars);

router.get('/', movieCtrl.getAllMovies);
router.get('/:id', movieCtrl.getOneMovie);
router.post('/', auth, movieCtrl.addMovie);
router.put('/:id',movieCtrl.updateMovie);
router.delete('/:id', movieCtrl.deleteMovie);



module.exports = router;