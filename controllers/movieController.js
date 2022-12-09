
const Movie = require('../models/movie.js');

exports.getAllMovies = (req, res, next) => {
    Movie.find()
      .then(movies => res.status(200).json(movies))
      .catch(error => res.status(400).json({ error }));
  };
exports.getOneMovie =  (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
      .then(movie => res.status(200).json(movie))
      .catch(error => res.status(404).json({ error }));
  };
exports.addMovie = (req, res, next) => {
    delete req.body._id;
    const movie = new Movie({
      ...req.body
    });
    movie.save()
      .then(() => res.status(201).json({ message: 'Film enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.updateMovie= (req,res,next)=>{
    Movie.updateOne({_id: req.params.id },{...req.body,_id: req.params.id})
      .then(()=>res.status(200).json({message:'Objet modifié !'}))
      .catch(error=>res.status(400).json({error}));
  };
exports.deleteMovie = (req, res, next) => {
    Movie.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Film supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};