const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require("fs");

app.listen(8000, () => {
    console.log('Server started!')
});

// read from json file for sample response
const fileName = "sample_data.json";
usersList = [];
fs.readFile(fileName, function(err, data){
    // Check for errors 
    if (err) throw err; 
   
    // Converting to JSON 
    usersList = JSON.parse(data); 
}
);

function generateUID(low, high){
    return Math.floor(Math.random() * (high - low) + low);
};

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.route('/api/users').get((req, res) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    res.send(usersList);
});

app.route('/api/users').post((req, res) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    // construct request
    let user = { "id":generateUID(1, 1000), "first_name": req.body.first_name, "last_name": req.body.last_name };
    usersList.push(user);
    fs.writeFile(fileName, JSON.stringify(usersList), err =>{
        if (err) throw err;
        console.log("User Created !");
    });

    // console.log(usersList);
    res.send(usersList);
});

app.route('/api/users').put((req, res) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    // loop to update
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].id == req.body.id) {
            console.log(usersList[i].first_name);
            usersList[i].first_name = req.body.first_name;
            usersList[i].last_name = req.body.last_name;
            console.log(usersList[i].first_name + "AFTER");
            break;
        }
    }
    fs.writeFile(fileName, JSON.stringify(usersList), err =>{
        if (err) throw err;
        console.log("User Updated !");
    });

    // console.log(usersList);
    res.send(usersList);
});

app.route('/api/users/:id').delete((req, res) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    let deletedID = req.params['id'];
    // loop to delete
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].id == deletedID) {
            // console.log(usersList);
            usersList.splice(i,1);
            console.log(usersList);
            break;
        }
    }
    fs.writeFile(fileName, JSON.stringify(usersList), err =>{
        if (err) throw err;
        console.log("User Deleted !");
    });

    // console.log(usersList);
    res.send(usersList);
});

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};