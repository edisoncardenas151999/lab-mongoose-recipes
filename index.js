const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // iteration 2

    let newRecipe = {
      title: "miXto quente",
      level: "Easy Peasy",
      ingredients: ["pão francês", "queijo", "presunto"],
      cuisine: "Brasileira",
      dishType: "snack",
      image:
        "http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg",
      duration: 5,
      creator: "unknown",
    };

    return Recipe.create(newRecipe);
  })
  .then((result) => console.log(`recipe added: ${result.title}`))
  // iteration 3

  // here we are passing an array of objects to the ".insertMany()" method that literally does what it says:
  // inserts multiple objects into the database as documents of the "recipes" collection
  .then(() => Recipe.insertMany(data))
  .then((result) => {
    result.forEach((item) => {
      console.log(`recipe for ${item.title} inserted successfully`);
    });
    // iteration 4

    // under the hood, ".updateOne()" basically works as ".findOneAndUpdate()" method:
    // finds a certain document in the database based on some criteria (in this case based on the "title"),
    // and sets some of the properties to the new values and saves it in the database
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((result) => {
    console.log(
      `Updated ${result.title} and new duration is: ${result.duration}`
    );

    // iteration 5

    // under the hood, it works as ".findOneAndDelete" method - find doc based on some criteria (in this case title but could be any other property)
    // and removes it from the DB permanently
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log(`The recipe is deleted`);
    return Recipe.deleteOne({ title: "Orange and Milk-Braised Pork Carnitas" });
  })
  .then(() => {
    console.log(`The recipe is deleted`);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
// iteration 6

// alternative way to using ".close()" method is using ".disconnect()". The best practice is to use ".close()" but you will see sometimes the alternative way as well
