const express = require("express");
const appRouter = express.Router();
const brandcontroller = require("../Controllers/BrandController");
const isAuth = require("../middlewares/isAuth");
const IsAdmin = require("../middlewares/isAdmin");



appRouter.post("/add",isAuth(), IsAdmin, brandcontroller.addbrand);
appRouter.get("/getAll", brandcontroller.getAllBrand)
appRouter.delete("/delete/:id",isAuth(), IsAdmin, brandcontroller.deleteBrand)
appRouter.patch("/update/:id",isAuth(), IsAdmin, brandcontroller.updateBrand)
appRouter.get("/getOne/:id", brandcontroller.getOneBrand)
//appRouter.get("/getbrandwithpromotion", brandcontroller.getbrandwithpromotion)


module.exports = appRouter;
