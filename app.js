const express = require("express");
const recipeRouter = require("./routes/recipeRoute");

const app = express();

// middleware to parse the request body
app.use(express.json());

app.use("/api/recipes", recipeRouter);

module.exports = app;