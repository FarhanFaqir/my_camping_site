const { render } = require("ejs");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var ejs = require("ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// const uri = process.env.MONGODB_URI;

 mongoose.connect(
   "mongodb+srv://farhanfaqir:QdTtTvZL3D568Ha@yelp-camp.pf3ue.mongodb.net/yelp-camp?retryWrites=true&w=majority",
   { useNewUrlParser: true, useUnifiedTopology: true },
   (error) => {
     if (error) console.log("Error connecting to database");
     else console.log("Successfully connected to the database");
   }
 );

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("campground", campgroundSchema);

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (error, allCampgrounds) {
    if (error) console.log(error);
    else res.render("campgrounds", { campgrounds: allCampgrounds });
  });
  //   res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
  Campground.create(newCampground, function (error, newlyCreatedCampground) {
    if (error) console.log("Something went wrong");
    else {
        console.log(newlyCreatedCampground); 
        res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function(error, foundCampground){
        if(error) console.log("Something went wrong");
        else res.render("show", {campground: foundCampground});
    });

    // res.render("show");
  });
 
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Yelp app is running "+port);
});


