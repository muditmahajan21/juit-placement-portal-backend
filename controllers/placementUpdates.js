const placementUpdatesRouter = require('express').Router()
const PlacementUpdate = require('../models/placementUpdate')

placementUpdatesRouter.get('/', async(request, response) => {
    const placementUpdates = await PlacementUpdate.find({})
    response.json(placementUpdates.map((placementUpdate) => placementUpdate.toJSON()))
})

placementUpdatesRouter.post('/', async (request, response) => {
    const body = request.body

    const placementUpdate = new PlacementUpdate({
        title: body.title,
        company: body.company,
        description: body.description,
        date: body.date,
        package: body.package,
    })

    const savedPlacementUpdate = await placementUpdate.save()

    response.status(201).json(savedPlacementUpdate)
})

module.exports = placementUpdatesRouter