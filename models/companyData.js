const mongoose = require('mongoose')

const questionSchema =  new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    round: {
        type: String,
        required: true
    }
})

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

const companyDataSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    year: {
        type: String,
        required: true
    },
    hired: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    },
})

companyDataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("companyData", companyDataSchema)