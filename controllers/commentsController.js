const Movie = require('../models/movie.js');

exports.getComments = (req,res,next)=>{
    Movie.findOne({ _id: req.params.idFilm }) //Rechercher le film
    .then(movie => {

        res.status(201).json({ commentaires : movie.commentaires});
     })
     .catch(error => res.status(404).json({ error }));    
}

exports.addComment =  (req,res,next) => {
    const comm = ({
      ...req.body
    });
    comm.like = 0;
    comm.dislike = 0;
    comm.datePublication = new Date().toLocaleDateString();
    comm.idUser=req.auth.userId;
    alreadyComment = false;
    Movie.findOne({ _id: req.params.idFilm }) //On récupere le film
    .then(movie => {
      movie.commentaires.forEach(c => {
        if(c.idUser == req.auth.userId){  //On verifie si le film a pas déjà été noté par l'user 
          console.log(c);
          alreadyComment = true;
        }
      });
      if(alreadyComment==false){ //S'il n'a pas été commenté, on ajoute
        Movie.updateOne(
          {_id: req.params.idFilm},
          {
            $set: {
              note:(((parseFloat(movie.note)* parseFloat(movie.commentaires.length) )+parseFloat(comm.note))/(parseFloat(movie.commentaires.length)+1))//calculer nouvelle moyenne
            },
            $push: { commentaires: comm} 
          }
          
          
          
          )
          .then(()=>res.status(200).json({message:'Commentaire ajouté !'})) 
          .catch(error=>res.status(400).json({error}));
      }else {
        res.status(400).json({erreur:"Deja commenté."}) //Sinon on renvoie un message d'erreur
      }
    
    })
    .catch(error => console.log(error));



};


exports.likeComment = (req,res,next) =>{
done = false;
type = req.body.type;
console.log(type);
Movie.findOne({ _id: req.params.idFilm }) //Rechercher le film
.then(movie => {
  movie.commentaires.forEach(c => {  //Chercher le commentaire en question
    if(c._id == req.params.idCom){ 
      if(type=="like") {
      
        //On vérifie qu'il a pas déjà liké 
        if(  c.usersLiked.find( element => element == req.auth.userId) == undefined){
          //S'il a déja disliké on retire son dislike
          if(  c.usersDisliked.find( element => element == req.auth.userId) == req.auth.userId){
            var indexUserToRemove = c.usersDisliked.indexOf(req.auth.userId);
            c.usersDisliked.splice(indexUserToRemove,1);
            c.dislike--;
          }
          //Et la on ajoute son like
          c.like++;
          c.usersLiked.push(req.auth.userId);   
        } 


      } 
     else if (type=="dislike")  {
       //On vérifie qu'il a pas déjà disliké 
       if(  c.usersDisliked.find( element => element == req.auth.userId) == undefined){
        //S'il a déja liké on retire son like
        if(  c.usersLiked.find( element => element == req.auth.userId) == req.auth.userId){
          var indexUserToRemove = c.usersLiked.indexOf(req.auth.userId);
          c.usersLiked.splice(indexUserToRemove,1);
          c.like--;
        }
        //Et la on ajoute son dislike
        c.dislike++;
        c.usersDisliked.push(req.auth.userId);   
      } 
     }
     else console.log("Erreur type.");

      done=true;
      movie.save();
      res.send({ message: "Like ajouté " });
    }

  });
  if(!done){
    res.status(401).json({ message: "Commentaire inexistant. " });

  }
})
.catch(error => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    existe=false;
    Movie.findOne({ _id: req.params.idFilm }) //Rechercher le film
       .then(movie => {
          movie.commentaires.forEach(c => {  
                if(req.auth.userId == c.idUser){ //Chercher le commentaire de l'utilisateur
                    existe=true; 
                    if (movie.commentaires.length  > 1 ){
                      movie.note = ((parseFloat(movie.note) * parseFloat(movie.commentaires.length))- parseFloat(c.note) )/( parseFloat(movie.commentaires.length) -1 ) //calculer nouvelle moyenne
                    }else movie.note =0;

                    var indexComToRemove = movie.commentaires.indexOf(c);
                    movie.commentaires.splice(indexComToRemove,1);
                    movie.save();
                    res.status(201).json({message:"Commentaire effacé avec succès."})
                }
            
            });
            if(!existe){
                res.status(401).json({message:"Commentaire inexistant"});

            }
        })
        .catch(error => res.status(404).json({ error }));    

};

exports.getUserComments = (req, res,next)=>{
  idUser = req.params.idUser;
  let comm = {};
  let userComments=[];
  Movie.find()
  .then(movies =>{
    movies.forEach(m=>{
      m.commentaires.forEach(c => {  
        if(idUser == c.idUser){
          comm = {
            titreFilm:m.titre,
            idFilm:m._id,
            imageFilm:m.posterURL,
            note : c.note,
            avisCourt : c.avisCourt,
            avisLong : c.avisLong,
            datePublication: c.datePublication,
            like: c.like,
            dislike : c.dislike,
            nbCommentaires : m.commentaires.length,
            moyenneFilm:m.note,
            idCommentaire:c._id
          }
          userComments.push(comm);
          
        }
    
    });
    })
    res.status(200).json({userComments});
  })
  .catch(error => res.status(400).json({ error }));
};