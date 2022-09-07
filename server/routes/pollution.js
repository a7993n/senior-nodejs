const router = require('express').Router();
const controller = require('../controllers/pollutions');

//GET /pollution/ - get pollution data by longitude and latitude
router.get('/pollution/', controller.byLongLat);
//get /pollution/all/ - get pollution data from database
router.get('/pollution/all/', controller.getPollution);


module.exports = router;