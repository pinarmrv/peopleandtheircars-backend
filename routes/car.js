var express = require('express');
var router = express.Router();
var CarController = require('../controllers/car');

router.get('/:plateNumber', CarController.getCarDetailsByPlateNumber);

module.exports = router;
