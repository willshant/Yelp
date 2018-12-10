var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"); // ODM - Object data mapper

mongoose.connect("mongodb://localhost/yelp_resort", { useNewUrlParser: true });

const port = 3000;

app.use(bodyParser.urlencoded({extended: true})); // set up body parser
app.set("view engine", "ejs");

var resortSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Resort = mongoose.model("Resort", resortSchema);

// Resort.create(
//     {
//         name: "New York", 
//         image: "https://cdn.vox-cdn.com/thumbor/1a2j8xn7OuhVfSM2alNkTe0VvDI=/0x0:2000x1125/1570x883/filters:focal(840x403:1160x723)/cdn.vox-cdn.com/uploads/chorus_image/image/58203557/171109_06_49_10_5DSR4201.0.jpg"
//     }, function(err, resort){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED RESORT: ");
//             console.log(resort);
//         }
//     });

// var resorts = [
//     {name: "Paris", image: "https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1240"},
//     {name: "New York", image: "https://cdn.vox-cdn.com/thumbor/1a2j8xn7OuhVfSM2alNkTe0VvDI=/0x0:2000x1125/1570x883/filters:focal(840x403:1160x723)/cdn.vox-cdn.com/uploads/chorus_image/image/58203557/171109_06_49_10_5DSR4201.0.jpg"},
//     {name: "London", image: "https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg"},
//     {name: "Vancouver", image: "https://blueocean.net/wp-content/uploads/2018/05/vancouver-canada-city-skyline.gif"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/resorts", function(req, res){
    // get all resorts from db
    Resort.find({}, function(err, allResorts){
        if (err) {
            console.log(err);
        } else {
            // redirect
            res.render("resorts", {resorts: allResorts})
        }
    });
});

app.post("/resorts", function(req, res){
    // get data from form and add to resorts
    var name = req.body.name;
    var image = req.body.image;
    var newResort = {name: name, image:image};
    // creat a new resort and save to db
    Resort.create(newResort, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            // redirect back to resorts page
            res.redirect("/resorts");
        }
    });
    
    
});

app.get("/resorts/new", function(req, res){
    res.render("new.ejs");
});

app.listen(port, function(){
    console.log("Node Server Started!");
});