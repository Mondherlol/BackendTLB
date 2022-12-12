const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');


exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.mdp,10)
        .then(hash=>{
            const user = new User({
                email: req.body.email,
                pseudo: req.body.pseudo,
                pdp: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                admin: false,
                mdp: hash
            });

            user.save()
                .then(()=>res.status(201).json({message:"Utilisateur créé !"}))
                .catch(error=> res.status(400).json({error}))
        })
        .catch(error=>res.status(500).json({error}));
};

exports.login = (req,res,next)=> {
    User.findOne({email: req.body.email})
        .then(user=>{
            if(user===null){
                res.status(401).json({message: ' Utilisateur inexistant.'});
            }else {
                bcrypt.compare(req.body.mdp,user.mdp)
                    .then(valid => {
                        if(!valid){
                            res.status(401).json({message: 'Mot de passe incorrect.'})
                        }else {
                            user.mdp="NOPE";
                            res.status(200).json({
                                user:user,
                                userId: user._id,
                                token: jwt.sign(
                                        {userId: user._id},
                                        'SUPERCALIFRAGILISTISGASPIOLIDOSCHIUS',
                                        {expiresIn: '5h'}
                                )
                            })
                        }
                    })
                    .catch(error=>res.status(500).json({error}))
            }
        })
        .catch(error=>res.status(500).json({error}));
}

exports.updateUser= (req,res,next)=>{
    User.findOne({ _id: req.params.id })
        .then(user => {
            user.pseudo=req.body.pseudo;
            user.save();
            res.status(200).json({message:"Utilisateur modifié avec succès."})
        })
        .catch(error=>res.status(400).json({error}));
  };

exports.getUsers= (req,res,next)=>{
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req,res,next)=>{
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};
exports.alreadyExist = (req,res,next)=> {
    console.log(req.body);
    console.log(req.body.email);
    User.findOne({email: req.body.email})
    .then(user=>{
        if(user===null){
           res.status(201).json({existe:false});
        }else {
       res.status(201).json({existe:true});
            }
        })
    .catch(error=>res.status(500).json({error}));

}

exports.getOneUser =  (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        var userObj = user.toObject();
        delete userObj.mdp;
        res.status(200).json(userObj);
      })
      .catch(error => res.status(404).json({ error }));
  };