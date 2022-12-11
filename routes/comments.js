const { Router } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/commentsController');

router.get('/user/:idUser',commentsCtrl.getUserComments);
router.get('/:idFilm',commentsCtrl.getComments);
router.post('/:idFilm',auth,commentsCtrl.addComment);
router.post('/like/:idFilm/:idCom',auth,commentsCtrl.likeComment);
router.delete('/:idFilm',auth,commentsCtrl.deleteComment);
module.exports = router;