const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: String,
    // ids of blogs are stored within user document as array of Mongo ids
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the password should not be revealed
        delete returnedObject.passwordHash
    }
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User