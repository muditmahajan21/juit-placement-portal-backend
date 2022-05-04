const companyDataRouter = require('express').Router()
const CompanyData = require('../models/companyData')

companyDataRouter.get('/', async(request, response) => {
    try {
        const companyDatas = await CompanyData.find({})
        response.json(companyDatas.map((companyData) => companyData.toJSON()))
    } catch (error) {
        console.log(error)
        response.status(500).json({ 
            error: 'Server Error' 
        })
    }
})

companyDataRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const companyData = new CompanyData({
            companyName: body.companyName,
            questions: body.questions,
            year: body.year,
            hired: body.hired,
            package: body.package,
        })

        const savedCompanyData = await companyData.save()

        response.status(201).json(savedCompanyData)
    }catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

// companyDataRouter.get('/:id', async (request, response) => {
//     try {
//         const companyData = await CompanyData.findById(request.params.id)
//         response.json(companyData.toJSON())
//     } catch (error) {
//         console.log(error)
//         response.status(500).json({
//             error: 'Server error'
//         })
//     }
// })

companyDataRouter.get('/:companyName', async (reques, response) => {
    try {
        const companyData = await CompanyData.findOne({ companyName: reques.params.companyName })
        response.json(companyData.toJSON())
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

companyDataRouter.put('/', async (request, response) => {
    try {

        const body = request.body

        const companyData = {
            onlineTestVenue: body.onlineTestVenue,
            totalInterviewRound: body.totalInterviewRound,
            techInterviewVenus: body.techInterviewVenus,
            piInterviewVenus: body.piInterviewVenus,
            totalQuestions: body.totalQuestions,
            totalTechnicalQuestions: body.totalTechnicalQuestions,
            totalAptitudeQuestions: body.totalAptitudeQuestions,
            totalDuration: body.totalDuration,
        }

        const filter = { companyName: body.companyName }
        
        let updatedCompanyData = await CompanyData.findOneAndUpdate(filter, companyData, { new: true })

        const company = await CompanyData.findOne({ companyName: body.companyName })

        company.aptitudeRound1.push(body.aptitudeRound1)
        company.technicalRound1.push(body.technicalRound1)
        company.technicalRound2.push(body.technicalRound1)
        company.technicalRound3.push(body.technicalRound1)
        company.technicalRound4.push(body.technicalRound1)
        company.technicalRound5.push(body.technicalRound1)
        company.technicalRound6.push(body.technicalRound1)
        company.gdRound2.push(body.gdRound2)
        company.gdRound3.push(body.gdRound3)
        company.gdRound4.push(body.gdRound4)
        company.gdRound5.push(body.gdRound5)
        company.gdRound6.push(body.gdRound6)
        company.hrRound2.push(body.hrRound2)
        company.hrRound3.push(body.hrRound3)
        company.hrRound4.push(body.hrRound4)
        company.hrRound5.push(body.hrRound5)
        company.hrRound6.push(body.hrRound6)

        updatedCompanyData = await company.save()
        response.json(updatedCompanyData)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

companyDataRouter.delete('/:id', async (request, response) => {
    try {
        await CompanyData.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

module.exports = companyDataRouter  