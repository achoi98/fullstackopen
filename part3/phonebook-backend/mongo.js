const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hey:${password}@cluster0.uwfxy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length = 3) {
    console.log('phonebook: \n')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
    })
}

else if (process.argv.length = 5) {

}
/*
const person = new Person({
    id: 1,
    name: "test entry",
    number: "41241251"
})

person.save().then(result => {
    console.log("person saved")
    mongoose.connection.close()
})




// fetching objects from the database
// prints all the notes stored in the database
/*
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})
*/