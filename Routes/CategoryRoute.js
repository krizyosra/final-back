const express = require("express");
const appRouter = express.Router();
const categorycontroller = require("../Controllers/CategoryController");
const isAuth = require("../middlewares/isAuth");
const IsAdmin = require("../middlewares/isAdmin");



appRouter.post("/add",isAuth(), IsAdmin, categorycontroller.addcategory);
appRouter.get("/get", categorycontroller.getAllCategory)
appRouter.delete("/delete/:id",isAuth(), IsAdmin, categorycontroller.deleteCategory)
appRouter.patch("/update/:id",isAuth(), IsAdmin, categorycontroller.updateCategory)
appRouter.get("/getOne/:id", categorycontroller.getOneCategory)
//appRouter.get("/getcategorywithpromotion", categorycontroller.getcategorywithpromotion)


module.exports = appRouter;
