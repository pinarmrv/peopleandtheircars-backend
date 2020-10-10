var express = require('express');
var router = express.Router();
var PersonController = require('../controllers/person');

router.get('/:personalId/car', PersonController.getCarDetailsByPersonalId);

module.exports = router;