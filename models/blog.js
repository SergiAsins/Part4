import mongoose from 'mongoose';
//const uniqueValidator = require('mongoose-unique-validator');

//error: "useAndModify" is not a valid option to set //mongoose.set('useAndModify', false)
//error: "useCreateIndex" is not a valid option to set //mongoose.set('useCreateIndex', true)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        minlength: 3,
        required: true
    },
    likes: {
        type: Number,
        default: 0 //gpt solution
    },
    comments: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})


blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {            
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

//blogSchema.plugin(uniqueValidator)

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;