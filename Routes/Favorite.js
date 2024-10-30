const express = require("express");
const appRouter = express.Router();
const favoritecontroller = require("../Controllers/FavoriteController");
const isAuth = require('../middlewares/isAuth');




appRouter.post("/add", isAuth(), favoritecontroller.addFavorite);
appRouter.delete("/delete/:id", isAuth(), favoritecontroller.deleteFavorite)
appRouter.get("/get", isAuth(),  favoritecontroller.getFavorites)

module.exports = appRouter;
