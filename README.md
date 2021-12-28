# people-and-their-cars

* Simple backend project using node.js
* used Express-generator for the initial project template.
* Includes sample `.xml` data file in `db` folder. used `xml2js` to convert the xml data to json format.

* server port: 3001
* To start the application use the following commands:
    - `npm install`
    - `npm start`
* Uploaded nodemon for the hot deploys, start server with: 
    - `nodemon ./bin/www`   

* example RestAPI requests are:
    - `http://localhost:3001/car/AZA8126`
    - `http://localhost:3001/person/8/car`
    - `http://localhost:3001/getPersonsByCar?color=green`
    - `http://localhost:3001/getPersonsWithInsurance`
    - `http://localhost:3001/getPersonsOlderThan?age=25`
    
