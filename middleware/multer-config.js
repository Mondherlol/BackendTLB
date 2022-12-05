const multer = require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(file);
        callback( null, 'backend/images')
    },
    filename: (req, file, callback)=> {
        const name = file.originalname.split(' ').join('_');    //On remplace les espaces par des _ si y en a
        nameSansExtension=name.split('.'); //On prend un tableau avec toutes les chaines séparés par des points
        nameSansExtension.pop(); //On retire la derniere chaine qui est l'extension (png,jpg,...)
        const extension = MIME_TYPES[file.mimetype]; //On determine l'extensioN 
        callback(null, req.body.pseudo +"_"+ Date.now() + '.' + extension); //On retourne le nom format nom + date + extension
    }
});

module.exports= multer({storage : storage}).single('pdp');