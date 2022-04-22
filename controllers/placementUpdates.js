const placementUpdatesRouter = require('express').Router()
const PlacementUpdate = require('../models/placementUpdate')

placementUpdatesRouter.get('/', async(request, response) => {
    const placementUpdates = await PlacementUpdate.find({})
    response.json(placementUpdates.map((placementUpdate) => placementUpdate.toJSON()))
})

placementUpdatesRouter.get('/:id', async (request, response) => {
    const placementUpdate = await PlacementUpdate.findById(request.params.id)
    response.json(placementUpdate.toJSON())
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

placementUpdatesRouter.put('/:id', async (request, response) => {
    const body = request.body

    const placementUpdate = {
        title: body.title,
        company: body.company,
        description: body.description,
        date: body.date,
        package: body.package,
    }

    const updatedPlacementUpdate = await PlacementUpdate.findByIdAndUpdate(request.params.id, placementUpdate, { new: true })

    response.json(updatedPlacementUpdate)
})

placementUpdatesRouter.delete('/:id', async (request, response) => {
    await PlacementUpdate.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = placementUpdatesRouter