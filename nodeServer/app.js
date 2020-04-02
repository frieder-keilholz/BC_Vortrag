var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
const blockchain = require('./bc');

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get("/script.js", (req, res) => {
    res.sendFile(__dirname + '/frontend/script.js');
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + '/frontend/style.css');
});

app.get("/getBC", (req, res) => {
   //res.json("BC"); 
   res.json(blockchain.getBlockchainJSON());
   console.log(blockchain.getBlockchainJSON());
});

app.get("/getWork", (req, res) => {
    res.json("Work");
});

app.post("/solution", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.post("/message", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});