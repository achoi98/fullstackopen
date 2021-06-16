const mongoose = require('mongoose')


// instead of hardcoding address of database into code
// environment variable MONGODB_URI used; address is passed here
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to mongoDB')
})
.catch((error) => {
    console.log('error connecting to mongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)