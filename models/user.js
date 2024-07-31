/*const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validators')

const userSchema = new mongoose.Schema({
 username:{
    type: String,
    required: true,
    minlength: 3,
    unique: true
 },
 name: String,
 passwoardHash: {
    type: String,
    required: true
 },
 blogs:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
    }
 ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {              //gpt solution
    returnedObject.id =returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;                       //the passwordHash should not be revealed
    });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);*/