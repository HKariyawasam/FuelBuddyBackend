const express = require('express');

const router = express.Router();

let queueController = require('../controllers/QueueController')


router.post('/',queueController.joinQueue);
router.get('/waitTime/:stationId',queueController.queueWaitingTime);
router.get('/:stationId/:vehicleType',queueController.getLatestQueueLengthByVehicleType);
router.get('/:stationId',queueController.getLatestQueueLength);
router.get('/check/joined/queue/:vehicleId',queueController.checkJoinedQueue);
router.put('/:stationId/:vehicleId',queueController.updateQueueDetails);



module.exports = router;