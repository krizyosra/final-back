const express = require("express");
const appRouter = express.Router();
const promotioncontroller = require("../Controllers/PromotionController");
const isAuth = require("../middlewares/isAuth");
const IsAdmin = require("../middlewares/isAdmin");



appRouter.post("/add",isAuth(), IsAdmin, promotioncontroller.addpromotion);
appRouter.get("/get", promotioncontroller.getAllPromotion)
//appRouter.get("/getpromotion", promotioncontroller.getAllPromotionsWithDetails)
appRouter.delete("/delete/:id",isAuth(), IsAdmin, promotioncontroller.deletePromotion)
appRouter.patch("/update/:id",isAuth(), IsAdmin, promotioncontroller.updatePromotion)
appRouter.patch("/addpromotionwithproduct",isAuth(), IsAdmin, promotioncontroller.addpromotionwithproduct)
appRouter.patch("/addpromotionwithsubcategories",isAuth(), IsAdmin, promotioncontroller.addpromotionwithsubcategories)
appRouter.patch("/addpromotionwithcategory",isAuth(), IsAdmin, promotioncontroller.addpromotionwithcategories)
appRouter.patch("/addpromotionwithbrand",isAuth(), IsAdmin, promotioncontroller.addpromotionwithbrand)
appRouter.get("/getAllpromotionActive",isAuth(), IsAdmin, promotioncontroller.getAllpromotionActive)
appRouter.get("/getAllpromotionExpired", isAuth(), IsAdmin,promotioncontroller.getAllpromotionsExpired)



module.exports = appRouter;
