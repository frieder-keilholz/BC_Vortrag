var express = require("express");
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/../../frontend/index.html');
});

app.get("/getBC", (req, res) => {
   res.json("BC"); 
});

app.get("/getWork", (req, res) => {
    res.json("Work");
});

app.post("/solution", (req, res) => {
    console.log(req.body.solution);
});