//jshint esversion:6

const mongoose = require('mongoose');

// connect to our db using mongoose, otherwise create and connect
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

// create new schema
// a blueprint or the structure of our data that we're going to save into our MongoDB db.
// what would the structure of the data look like
const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

// use schema to create model
// first parameter is the singular form of your collection -> mongoose will convert it to plural
const Fruit = mongoose.model("Fruit", fruitSchema);

// create a new fruit documents
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Prtty solid as a fruit."
});

// save this fruit document into a Fruit collection inside FruitsDB
//fruit.save()

// another collection of People in FruitsDB
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name: "John",
    rating: 37
});

//person.save()

const kiwi = new Fruit ({
    name: "Kiwi",
    score: 4,
    review: "The best fruit!"
});

const orange = new Fruit ({
    name: "Orange",
    score: 4,
    review: "Full of vitamin C!"
});

const banana = new Fruit ({
    name: "Banana",
    score: 4,
    review: "Makes me full!"
});

// second parameter is the callback function that give a log of error messages
// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

// read from db
// tap into fruits collection using Fruit model
// callback function has two parameters, error message and whatever it finds back.
Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {
        // close connection if no error and got the log
        // find function above receives the fruits array, so we can close before the loop. 
        // we already have the data and only need to display on the console.
        mongoose.connection.close();
        
        // callback with paramenter of each item in the array of fruits collection
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});