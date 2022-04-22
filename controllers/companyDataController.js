const companyDataRouter = require('express').Router()
const CompanyData = require('../models/companyData')

companyDataRouter.get('/', async(request, response) => {
    const companyDatas = await CompanyData.find({})
    response.json(companyDatas.map((companyData) => companyData.toJSON()))
})

companyDataRouter.post('/', async (request, response) => {
    const body = request.body

    const companyData  = new CompanyData({
        company: body.companyName,
        question: body.questions,
        year: body.year,
        hired: body.hired,
        package: body.package,
    })

    const savedCompanyData = await companyData.save()

    response.status(201).json(savedCompanyData)
})
// placementUpdatesRouter.put('/', async (request, response) => {
//     const body = request.body
//
//     const placementUpdate.js = new PlacementUpdate({
//         title: body.title,
//         company: body.company,
//         description: body.description,
//         date: body.date,
//         package: body.package,
//     })
//
//     const savedPlacementUpdate = await placementUpdate.js.save()
//
//     response.status(201).json(savedPlacementUpdate)
// })
// placementUpdatesRouter.delete('/', async (request, response) => {
//     const body = request.body
//
//     const placementUpdate.js = new PlacementUpdate({
//         title: body.title,
//         company: body.company,
//         description: body.description,
//         date: body.date,
//         package: body.package,
//     })
//
//     const savedPlacementUpdate = await placementUpdate.js.save()
//
//     response.status(201).json(savedPlacementUpdate)
// })

module.exports = companyDataRoute