const express = require("express");
const appRouter = express.Router();
const subcategorycontroller = require("../Controllers/subCategoryController");
const isAuth = require("../middlewares/isAuth");
const IsAdmin = require("../middlewares/isAdmin");




appRouter.post("/add",isAuth(), IsAdmin, subcategorycontroller.addSubCategory);
appRouter.get("/get", subcategorycontroller.getAllSubCategory)
appRouter.delete("/delete/:id",isAuth(), IsAdmin, subcategorycontroller.deleteSubCategory)
appRouter.patch("/update/:id",isAuth(), IsAdmin, subcategorycontroller.updateSubCategory)
appRouter.get("/getOne/:id", subcategorycontroller.getOneSubCategory)
//appRouter.get("/getsubcategorieswithpromotion", subcategorycontroller.getSubCategoryWithpromotion)


module.exports = appRouter;
