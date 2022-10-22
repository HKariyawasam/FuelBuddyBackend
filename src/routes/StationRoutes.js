const express = require('express');

const router = express.Router();

let stationController = require('../controllers/StationController')


router.post('/',stationController.create);
router.get('/',stationController.viewAllStations);
router.get('/:id',stationController.viewOneStation);
router.get('/fuel/:id',stationController.viewFuelInOneStation);
router.get('/search/name/:name',stationController.searchStations);
router.put('/:id/:fuelType',stationController.updateFuelDetails);



module.exports = router;