const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie.js');
const userRoutes = require('./routes/user.js');
const path = require('path');
const app = express();
app.use(express.json());

//Connexion à mongodb
mongoose.connect('mongodb+srv://user:user@cluster0.de4xtem.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=>console.log('Connexion à MongoDB échouée !'));

//MiddleWare pour régler les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/movie',movieRoutes);
app.use('/api/user',userRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));


  module.exports = app;