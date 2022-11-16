const express = require('express');

const app = express();
const mongoose = require('mongoose');
const Movie = require('./models/movie');
app.use(express.json());

mongoose.connect('mongodb+srv://user:user@cluster0.de4xtem.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=>console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.get('/api/movie/:id', (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
      .then(movie => res.status(200).json(movie))
      .catch(error => res.status(404).json({ error }));
  });
  app.post('/api/movie', (req, res, next) => {
    delete req.body._id;
    const movie = new Movie({
      ...req.body
    });
    movie.save()
      .then(() => res.status(201).json({ message: 'Film enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });


  app.put('/api/movie/:id',(req,res,next)=>{
    Movie.updateOne({_id: req.params.id },{...req.body,_id: req.params.id})
      .then(()=>res.status(200).json({message:'Objet modifié !'}))
      .catch(error=>res.status(400).json({error}));
  });

  app.delete('/api/movie/:id', (req, res, next) => {
    Movie.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Film supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


  app.use('/api/movie', (req, res, next) => {
    Movie.find()
      .then(movies => res.status(200).json(movies))
      .catch(error => res.status(400).json({ error }));
  });
  
// app.use('/api/movie', (req, res, next) => {
//     const movie = [
//       {
//         _id: 'Avengers',
//         titre:'Avengers Infinity War',
//         anneeSortie : 2018,
//         description: 'Iron Man, Thor, the Hulk, and a bunch of other Avengers unite to battle their most powerful enemy yet.',
//         posterURL: 'https://i.imgur.com/VqgIGmN.png',
//         note: 5,
//         themes:'["Fantasy","Sci Fi"]',
//         userId: 'qsomihvqios',
//       },
//       {
//         _id: 'Sonic',
//         titre: 'Sonic Le Film',
//         anneeSortie : 2022,
//         description: "Bien installé dans la petite ville de Green Hills, Sonic veut maintenant prouver qu'il a l'étoffe d'un véritable héros.",
//         posterURL: 'https://i.ebayimg.com/images/g/j08AAOSwG-diUNyQ/s-l1600.jpg',
//         note: 4,
//         themes:'["Animation","Aventure"]',
//         userId: 'qsomihvqios',
//       },
//       {
//         _id: 'Saw',
//         titre: 'Saw',
//         anneeSortie : 2004,
//         description: "Deux hommes se réveillent enchaînés au mur d'une salle de bains. Ils ignorent où ils sont et ne se connaissent pas. ",
//         posterURL: 'https://m.media-amazon.com/images/M/MV5BM2M1MzI1MWYtYmM2ZC00OWY3LTk0ZGMtNmRkNzU1NzEzMWE5XkEyXkFqcGdeQXVyODUwOTkwODk@._V1_FMjpg_UX1000_.jpg',
//         note: 4.5,
//         themes:'["Horreur","Psychologique"]',
//         userId: 'qsomihvqios',
//       },
      
//     ];
//     res.status(200).json(movie);
//   });

  module.exports = app;