const express = require('express');

const router = express.Router();

let queueController = require('../controllers/QueueController')

/**
   * routes for management of queue details of a specific station

    *router.post('/',queueController.joinQueue) - creating of a queue

    *router.get('/waitTime/:stationId',queueController.queueWaitingTime) -retieving the total wait time in a queue of a station
    *pathparam stationId

    *router.get('/:stationId/:vehicleType',queueController.getLatestQueueLengthByVehicleType) - get the queue length by vehicle type
    *pathparam stationId,vehicleType

    *router.get('/:stationId',queueController.getLatestQueueLength) - get the total queue length
    *pathparam stationId

    *router.get('/check/joined/queue/:vehicleId',queueController.checkJoinedQueue) - check if a particular vehicle has already joined a queue
    *pathparam vehicleId

    *router.put('/:stationId/:vehicleId',queueController.updateQueueDetails) -update queue details
    *pathparam stationId,vehicleId

*/


router.post('/',queueController.joinQueue);
router.get('/waitTime/:stationId',queueController.queueWaitingTime);
router.get('/:stationId/:vehicleType',queueController.getLatestQueueLengthByVehicleType);
router.get('/:stationId',queueController.getLatestQueueLength);
router.get('/check/joined/queue/:vehicleId',queueController.checkJoinedQueue);
router.put('/:stationId/:vehicleId',queueController.updateQueueDetails);



module.exports = router;