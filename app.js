var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const port = 3000;

app.use(bodyParser.urlencoded({extended: true})); // set up body parser
app.set("view engine", "ejs");

var resorts = [
    {name: "Paris", image: ""},
    {name: "New York", image: ""},
    {name: "qwe", image: ""}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/resorts", function(req, res){
    
    res.render("resorts");
});

app.post("/resorts", function(req, res){
    // get data from form and add to resorts
    // redirect back to resorts page
    var name = req.body.name;
    var image = req.body.image;
    var newResort = {name: name, image:image};
    resorts.push(newResort);
    res.redirect("/resorts");
});

app.get("/resorts/new", function(req, res){
    res.render("new.ejs");
});

app.listen(port, function(){
    console.log("Node Server Started!");
});