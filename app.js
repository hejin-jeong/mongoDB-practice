//jshint esversion:6

const mongoose = require('mongoose');

// connect to our db using mongoose, otherwise create and connect
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

// // create new schema
// // a blueprint or the structure of our data that we're going to save into our MongoDB db.
// // what would the structure of the data look like
// const fruitSchema = new mongoose.Schema ({
//     name: String,
//     rating: Number,
//     review: String
// });

// add validation
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});


// use schema to create model
// first parameter is the singular form of your collection -> mongoose will convert it to plural
const Fruit = mongoose.model("Fruit", fruitSchema);

// create a new fruit documents
const fruit = new Fruit ({
    // name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// save this fruit document into a Fruit collection inside FruitsDB
// fruit.save()

// another collection of People in FruitsDB
// embeded fruit document
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit for Amy!"
})

// pineapple.save();

const person = new Person ({
    name: "Amy",
    rating: 12,
    favoriteFruit: pineapple
});

// person.save()

const kiwi = new Fruit ({
    name: "Kiwi",
    score: 4,
    review: "The best fruit!"
});

// const orange = new Fruit ({
//     name: "Orange",
//     score: 4,
//     review: "Full of vitamin C!"
// });

// const banana = new Fruit ({
//     name: "Banana",
//     score: 4,
//     review: "Makes me full!"
// });

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

// update
// parameters:
// 1. which document are you going to update (filter)
// 2. what are you going to update/change to
// 3. callback for logging errors
// Fruit.updateOne({_id: "63b868eac0bb86897920b8bb"}, {name: "Peach"}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document");
//     }
// });

// Person.updateOne({name: "John"}, {favoriteFruit: kiwi}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated John's favorite fruit");
//     }
// });


// create a relationship between existing document in 1 collection with existing document in 2 collection
Fruit.findOne({name: "Orange"}, function(err, fruit) {
    if (err) {
        console.log("Error finding Fruit.");
    }
    else {
        Person.updateOne({name: "John"}, {favouriteFruit: fruit }, function(err) {
            if (err) {
                console.log(err);
            } else {
                // mongoose.connection.close();
                console.log("Successfully updated John document.");
            }
        });
    }
});

updatePersonFavoriteFruit = function (fruitName, personName) {
                    
    // Find the fruit based on parameter fruitName
  
    Fruit.find({ name: fruitName }, function (err, fruitArray) {
       if(err) console.log(err);
                
    //Once the fruit has been found, it will be stored in an array, loop through it 
    // to extract the data 
  
    fruitArray.forEach(fruitElement => {
       Person.findOneAndUpdate({name: personName}, {favoriteFruit: fruitElement}, (err, person) => {
        if (err) console.log(err);
        console.log(person); 
           });                
        });
      });    
    }
         
updatePersonFavoriteFruit("Orange", "John");


// delete
// Fruit.deleteOne({name: "Peach"}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted the document");
//     }
// });

// // delete many
// Person.deleteMany({name: "John"}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all the documents");
//     }
// });