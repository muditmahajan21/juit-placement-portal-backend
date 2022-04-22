const mongoose = require('mongoose')

const companyDataSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    questions: {
        type: [
            {
                id:String,
                question:String,
                round:String
            }
        ],
        required: true
    },
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