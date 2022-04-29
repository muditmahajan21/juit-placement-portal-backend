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

companyDataRouter.get('/:id', async (request, response) => {
    try {
        const companyData = await CompanyData.findById(request.params.id)
        response.json(companyData.toJSON())
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

companyDataRouter.put('/:id', async (request, response) => {
    try {

        const body = request.body

        const companyData = {
            companyName: body.companyName,
            questions: body.questions,
            year: body.year,
            hired: body.hired,
            package: body.package,
        }

        const updatedCompanyData = await CompanyData.findByIdAndUpdate(request.params.id, companyData, {new: true})

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