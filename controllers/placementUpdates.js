const placementUpdatesRouter = require('express').Router()
const PlacementUpdate = require('../models/placementUpdate')
const companyData = require('../models/companyData')

placementUpdatesRouter.get('/', async(request, response) => {
    try {
        const placementUpdates = await PlacementUpdate.find({})
        response.json(placementUpdates.map((placementUpdate) => placementUpdate.toJSON()))
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

placementUpdatesRouter.get('/:id', async (request, response) => {

    try {
        const placementUpdate = await PlacementUpdate.findById(request.params.id)
        response.json(placementUpdate.toJSON())
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

placementUpdatesRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const placementUpdate = new PlacementUpdate({
            title: body.title,
            company: body.company,
            description: body.description,
            date: body.date,
            package: body.package,
        })

        const savedPlacementUpdate = await placementUpdate.save()

        const presentCompanyData = await companyData.findOne({ companyName: body.company })

        if(presentCompanyData) {
            const jobData = {
                jobTitle: body.title,
                package: body.package,
                jobDescription: body.description,
            }
            presentCompanyData.jobs.push(jobData)
            await presentCompanyData.save()
        } else {
        
            const newCompanyData = new companyData({
                companyName: body.company,
                jobs: {
                    jobTitle: body.title,
                    package: body.package,
                    jobDescription: body.description
                }
            })
            const savedCompanyData = await newCompanyData.save()
        }

        response.status(201).json(savedPlacementUpdate)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

placementUpdatesRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const placementUpdate = {
            title: body.title,
            company: body.company,
            description: body.description,
            date: body.date,
            package: body.package,
        }

        const updatedPlacementUpdate = await PlacementUpdate.findByIdAndUpdate(request.params.id, placementUpdate, {new: true})

        response.json(updatedPlacementUpdate)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

placementUpdatesRouter.delete('/:id', async (request, response) => {
    try {
        await PlacementUpdate.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (error) {
        console.log(error)
            response.status(500).json({
                error: 'Server error'
            })
        }
})


module.exports = placementUpdatesRouter