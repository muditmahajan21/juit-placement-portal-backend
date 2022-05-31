const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
       
    },
    package: {
        type: String,
    },
    jobDescription: {
        type: String,
    }
})

const questionSchema = new mongoose.Schema({
    question: {
        type: String
    },
    round: {
        type: String
    }
})

jobSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

companyDataSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    jobs: [jobSchema],
    questions: [questionSchema]
})

companyDataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("companyData", companyDataSchema)