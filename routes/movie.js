const { Router } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieCtrl = require('../controllers/movieController');

router.get('/', movieCtrl.getAllMovies);
router.get('/:id', movieCtrl.getOneMovie);
router.post('/', movieCtrl.addMovie);
router.put('/:id',movieCtrl.updateMovie);
router.delete('/:id', movieCtrl.deleteMovie);


module.exports = router;