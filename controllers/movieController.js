
const auth = require('../middleware/auth.js');
const Movie = require('../models/movie.js');
const User = require('../models/user.js');



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

    User.findOne({_id: req.auth.userId}) //On recherche l'utilisateur qui veut ajouter le film
    .then(user=>{ 
      const movie = new Movie({ //On crée une instance du film envoyé
        ...req.body
      });
      comm =( { //On crée le commentaire de l'utilisateur
        pseudoUser:user.pseudo,
        pdpUser:user.pdp,
        idUser:req.auth.userId,
        note:req.body.note,
        dislike : 0,
        like : 0,
        datePublication : new Date().toLocaleDateString(),
        avisCourt : req.body.avisCourt,
        avisLong : req.body.avisLong
      });
      
    movie.commentaires.push(comm); //On l'ajoute au film
    movie.note=comm.note; //On ajoute la note du film
    movie.save() //On enregistre sur mongoose
      .then(() => res.status(201).json({ message: 'Film enregistré !'}))
      .catch(error => res.status(400).json({ error }));
        })
    .catch(error=>res.status(500).json({error}));


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


//Plusieurs themes
exports.getMoviesByThemes = (req, res, next) => {
  themes = req.body.themes;
  Movie.find()
    .then(movies =>{
      let similarMovies = [];
      movies.forEach(m => {
        m.themes.forEach(t =>{
          themes.forEach(t2 => {
              if (t==t2){
                if(similarMovies.indexOf(m)==-1){
                  similarMovies.push(m);
                }
              }
          } )
        })
      });
      res.status(200).json(similarMovies);
    })
    .catch(error => res.status(400).json({ error }));
};

//Récuperer avec un seul theme
exports.getMoviesByTheme = (req, res, next) => {
  theme = req.params.theme;
  console.log(theme);
  Movie.find()
    .then(movies =>{
      let moviesWithSameTheme = [];
      movies.forEach(m => {
        m.themes.forEach(t =>{
              if (t==theme){
                  moviesWithSameTheme.push(m);
              }
        })
      });
      res.status(200).json(moviesWithSameTheme);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.getMovieByStars = (req,res,next)=>{

  stars = req.params.stars;
  console.log(stars);
  Movie.find()
    .then(movies =>{
      let moviesTries = [];
      movies.forEach(m => {
              if ((parseFloat(m.note) /4 ) <= parseFloat(stars)){
                moviesTries.push(m);
              }
      });
      res.status(200).json(moviesTries);
    })
    .catch(error => res.status(400).json({ error }));
};


//Récuperer films avec titre
exports.getMoviesByTitle = (req, res, next) => {
  titre = (req.params.titre).toLowerCase();
  console.log(titre);
  Movie.find()
    .then(movies =>{
      let result = [];
      movies.forEach(m => {
        if(m.titre.toLowerCase().includes(titre)){
          result.push(m);
        }
      });
      res.status(200).json(result);
    })
    .catch(error => res.status(400).json({ error }));
};



