const companyDataRouter = require('express').Router()
const CompanyData = require('../models/companyData')

companyDataRouter.get('/', async(request, response) => {
    const companyDatas = await CompanyData.find({})
    response.json(companyDatas.map((companyData) => companyData.toJSON()))
})

companyDataRouter.post('/', async (request, response) => {
    const body = request.body

    const companyData  = new CompanyData({
        companyName: body.companyName,
        question: body.questions,
        year: body.year,
        hired: body.hired,
        package: body.package,
    })

    const savedCompanyData = await companyData.save()

    response.status(201).json(savedCompanyData)
})



module.exports = companyDataRouter  