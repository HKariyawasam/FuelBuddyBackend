const express = require('express');

const router = express.Router();

let stationController = require('../controllers/StationController')
/** 
    *routes for the management of station details

    *router.post('/',stationController.create) - creates a station object

    *router.get('/',stationController.viewAllStations)- retieve all the stations

    *router.get('/:id',stationController.viewOneStation)-retrieve details of one station
    *pathparam id

    *router.get('/fuel/:id',stationController.viewFuelInOneStation) - retreive details of fuel stocks in a station
    *pathparam id

    *router.get('/search/name/:name',stationController.searchStations) -search for a station details by name
    *pathparam name

    *router.put('/:id/:fuelType',stationController.updateFuelDetails) - update station details
    *pathparam id

*/


router.post('/',stationController.create);
router.get('/',stationController.viewAllStations);
router.get('/:id',stationController.viewOneStation);
router.get('/fuel/:id',stationController.viewFuelInOneStation);
router.get('/search/name/:name',stationController.searchStations);
router.put('/:id/:fuelType',stationController.updateFuelDetails);



module.exports = router;