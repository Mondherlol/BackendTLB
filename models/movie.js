const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  titre: { type: String, required: false },
  anneeSortie : {type: Number, required: false},
  description: { type: String, required: false },
  posterURL: { type: String, required: false },
  note: { type:Number, required:false},
  realisateur : { type:String, required: false},
  trailerURL : { type:String, required: false},
  themes : { type:String, required : false},
  userId: { type: String, required: false }

});

module.exports = mongoose.model('Movie', movieSchema);


