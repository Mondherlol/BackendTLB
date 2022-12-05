const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email:{ type:String, required: true, unique: true},
    mdp: { type:String, required: true },
    pseudo: { type:String, required: true},
    pdp : {type:String, required:true},
    admin: {type:Boolean, required:true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);


