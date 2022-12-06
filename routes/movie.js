const { Router } = require('express');
const express = require('express');

const router = express.Router();
const movieCtrl = require('../controllers/movieController');

router.get('/', movieCtrl.getAllMovies);
router.get('/:id', movieCtrl.getOneMovie);
router.post('/', movieCtrl.addMovie);
router.put('/:id',movieCtrl.updateMovie);
router.delete('/:id', movieCtrl.deleteMovie);

//Commentaires
router.post('/commentaire/:idFilm',movieCtrl.addComment);
router.get('/commentaire/like/:idFilm/:idCom',movieCtrl.likeComment);

module.exports = router;