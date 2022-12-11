const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieCtrl = require('../controllers/movieController');


//Récuperer films avec un ou plusieurs themes
router.post('/theme/',movieCtrl.getMoviesByThemes); 
//Récuper films avec un theme
router.get('/theme/:theme',movieCtrl.getMoviesByTheme);
router.get('/stars/:stars',movieCtrl.getMovieByStars);

router.get('/titre/:titre',movieCtrl.getMoviesByTitle);

router.get('/', movieCtrl.getAllMovies);
router.get('/:id', movieCtrl.getOneMovie);
router.post('/', auth, movieCtrl.addMovie);
router.put('/:id',auth,movieCtrl.updateMovie);
router.delete('/:id',auth, movieCtrl.deleteMovie);



module.exports = router;