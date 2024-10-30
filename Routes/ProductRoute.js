const express = require("express");
const appRouter = express.Router();
const productcontroller = require("../Controllers/ProductController");
const upload=require('../Utils/multer');
const isAuth = require("../middlewares/isAuth");
const IsAdmin = require("../middlewares/isAdmin");



appRouter.post("/add",upload("products").single("file"),isAuth(), IsAdmin, productcontroller.addproduct);
//appRouter.get("/getpromotion/", productcontroller.getproductwithpromotion)
appRouter.get("/getproductwithbrand", productcontroller.getproductwithbrand)
appRouter.get("/getproductwithsub", productcontroller.getproductwithsubcategory)
appRouter.get("/getproductwithcategory", productcontroller.getproductwithCategory)
appRouter.delete("/deleteproduct/:id",isAuth(), IsAdmin, productcontroller.deleteproduct)
appRouter.get("/getAll", productcontroller.getAllproducts)
appRouter.get("/getwithdetails/:id", productcontroller.getproductwithdetails)
appRouter.patch("/updateproduct/:id",upload("products").single("file"),isAuth(), IsAdmin, productcontroller.updateproduct)
appRouter.put("/addlike/:id", productcontroller.likeproduct)


module.exports = appRouter;
