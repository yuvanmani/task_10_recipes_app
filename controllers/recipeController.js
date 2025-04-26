const Recipe = require("../models/recipe");

const recipeController = {
    createRecipe: async (req, res) => {
        try {
            // get the details from the request body
            const { name, description, price } = req.body;

            // check if the recipe already exists
            const recipeExists = await Recipe.findOne({ name });

            if (recipeExists) {
                return res.status(400).json({ message: "Recipe already exists" });
            }

            // create a new recipe object
            const newRecipe = new Recipe({
                name,
                description,
                price
            })

            // save the new recipe to the database
            await newRecipe.save();

            // send response to the user
            res.status(201).json({ message: "Recipe created" });
        }
        catch (error) {
            res.status(500).json({ message: "Create recipe failed" });
        }
    },
    getAllRecipes: async (req, res) => {
        try {
            // find all recipes from database
            const recipes = await Recipe.find().select("-__v");

            // send the all recipes to the user
            res.status(200).json(recipes);
        }
        catch (error) {
            res.status(500).json({ message: "Get all recipes failed" });
        }
    },
    getRecipeById: async (req, res) => {
        try {
            // get the id detail from the request params
            const { id } = req.params;

            // check if the recipe exists
            const recipe = await Recipe.findById(id).select("-__v");
            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }

            // send the response
            res.status(200).json(recipe);

        }
        catch (error) {
            res.status(500).json({ message: "Get recipe by Id failed" });
        }
    },
    updateRecipe: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // get the datas need to update from request body
            const { name, description, price } = req.body;

            // check if the recipe exist
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }

            const updatedRecipe = await Recipe.findByIdAndUpdate(id, { name, description, price }, { new: true });

            // return the response
            res.status(200).json(updatedRecipe);
        }
        catch (error) {
            res.status(500).json({ message: "Update recipe failed" });
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // check if the recipe exist
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }

            // find and delete the recipe by id
            await Recipe.findByIdAndDelete(id);

            // return the response
            res.status(200).json({ message: "Recipe deleted" });

        }
        catch (error) {
            res.status(500).json({ message: "Delete recipe failed" });
        }
    }
}

module.exports = recipeController;