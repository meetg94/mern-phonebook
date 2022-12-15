const mongoose = require('mongoose')

if (process.argv.length < 3 || (process.argv.length > 3 && process.argv.length < 5)) {
    console.log(`USAGE: node mongo.js password name number`)
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://phonebook-app:${password}@cluster0.q9oipmk.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String, 
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook: \n")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

mongoose
    .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({
                name: `${name}`,
                number: `${number}`,
            })

            return person.save()
        })
        .then(() => {
            console.log(`${name} and ${number} added to phonebook!`)
            return mongoose.connection.close()
        })
    .catch((err) => console.log(err))