var express = require('express');
var router = express.Router();
var PersonController = require('../controllers/person');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPersonsByCar', PersonController.getPeopleByColourCar);
router.get('/getPersonsOlderThan', PersonController.getPeopleByGivenAge);
router.get('/getPersonsWithInsurance', PersonController.getPeopleWithInsurance);

module.exports = router;
