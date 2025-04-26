const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
})

module.exports = mongoose.model("Recipe", recipeSchema, "recipes");