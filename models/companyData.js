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

jobSchema.set('toJSON', {
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
    onlineTestVenue: {
        type: String,
    },
    totalInterviewRound: {
        type: String,
    },
    techInterviewVenus: {
        type: String,
    },
    piInterviewVenus: {
        type: String,
    },
    totalQuestions: {
        type: String,
    },
    totalTechnicalQuestions: {
        type: String,
    },
    totalAptitudeQuestions: {
        type: String,
    },
    totalDuration: {
        type: String,
    },
    jobs: [jobSchema],
    aptitudeRound1: {
        type: Array,
    },
    technicalRound1: {
        type: Array,
    },
    technicalRound2: {
        type: Array,
    },
    technicalRound3: {
        type: Array,
    },
    technicalRound4: {
        type: Array,
    },
    technicalRound5: {
        type: Array,
    },
    technicalRound6: {
        type: Array,
    },
    hrRound2: {
        type: Array,
    },
    hrRound3: {
        type: Array,
    },
    hrRound4: {
        type: Array,
    },
    hrRound5: {
        type: Array,
    },
    hrRound6: {
        type: Array,
    },
    gdRound2: {
        type: Array,
    },
    gdRound3: {
        type: Array,
    },
    gdRound4: {
        type: Array,
    },
    gdRound5: {
        type: Array,
    },
    gdRound6: {
        type: Array,
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