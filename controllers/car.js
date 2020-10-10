var parseString = require('xml2js').parseString;
var fs = require('fs');
var path = require('path');

const getCarDetailsByPlateNumber = async (req, res) => {
    var filePath = path.join(__dirname, '../db/sample.xml');
    var xmlData = fs.readFileSync(filePath, "utf8");
    var plateNumber = req.params.plateNumber;

    try {
        parseString(xmlData, function (err, result) {

            let data = result.People.Person;

            let filtered = data.reduce((acc, Person) => {
                return acc.concat(Person.Car)
            }, [])
            .find( Car => (Car.NumberPlate[0] === plateNumber));

            let response = {
                color: filtered.Color[0],
                type: filtered.Type[0]
            }
            return res.status(200).json(response);
        });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    getCarDetailsByPlateNumber
}