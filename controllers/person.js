var parseString = require('xml2js').parseString;
var fs = require('fs');
var path = require('path');

const getCarDetailsByPersonalId = async (req, res) => {
    var filePath = path.join(__dirname, '../db/sample.xml');
    var xmlData = fs.readFileSync(filePath, "utf8");
    var personalId = req.params.personalId;

    try {
        parseString(xmlData, function (err, result) {

            let data = result.People.Person;
            let person = data.find(person => (person.id[0] === personalId));

            if("Car" in person) {
                let response = person.Car.reduce((acc, Car) => {
                    let pair = {
                        color: Car.Color[0],
                        type: Car.Type[0]
                    }
                    return acc.concat(pair)
                }, []);
                return res.status(200).json(response);
            }
            else{
                return res.status(200).json('Car not found');
            }

        });
    }
    catch(err){
        console.log(err);
    }
}

const getPeopleByColourCar = async (req, res) => {
    var filePath = path.join(__dirname, '../db/sample.xml');
    var xmlData = fs.readFileSync(filePath, "utf8");
    var colour = req.query.color;

    try {
        parseString(xmlData, function (err, result) {

            let data = result.People.Person;
            let peopleList = data.filter((Person) => {
                if("Car" in Person){
                    let isFound = false
                   Person.Car.forEach((Car) => {
                          if( Car.Color[0].localeCompare(colour, 'en', {sensitivity: 'accent'}) === 0)
                              isFound = true
                       }
                    )
                    return isFound
                }
            })
            .reduce((acc, person) => {
                    return acc.concat(person.Name[0])
                }, [])

            return res.status(200).json(peopleList);

        });
    }
    catch(err){
        console.log(err);
    }
}

const getPeopleByGivenAge = async (req, res) => {
    var filePath = path.join(__dirname, '../db/sample.xml');
    var xmlData = fs.readFileSync(filePath, "utf8");
    var age = req.query.age;

    try {
        parseString(xmlData, function (err, result) {

            let data = result.People.Person;
            let peopleList = data.reduce((acc, Person) => {
                if(Person.Age[0] > age)
                return acc.concat(Person.Name[0])
                else
                    return acc

            }, [])

            return res.status(200).json(peopleList);

        });
    }
    catch(err){
        console.log(err);
    }
}

const getPeopleWithInsurance = async (req, res) => {

    var filePath = path.join(__dirname, '../db/sample.xml');
    var xmlData = fs.readFileSync(filePath, "utf8");

    try {
        parseString(xmlData, function (err, result) {

            let data = result.People.Person;
            let peopleList = data.filter((Person) => {
                if("Car" in Person){
                    let isFound = false
                    Person.Car.forEach((Car) => {
                            if("Insurance" in Car)
                                isFound = true
                        }
                    )
                    return isFound
                }
            })
            .reduce((acc, person) => {
                return acc.concat(person.Name[0])
            }, [])

            return res.status(200).json(peopleList);

        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getCarDetailsByPersonalId,
    getPeopleByColourCar,
    getPeopleByGivenAge,
    getPeopleWithInsurance
}