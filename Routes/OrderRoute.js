const express = require("express");
const appRouter = express.Router();
const ordercontroller = require("../Controllers/OrderController");
const isAuth = require('../middlewares/isAuth');
const IsAdmin = require("../middlewares/isAdmin");




appRouter.post("/add", isAuth(), ordercontroller.addOrder);
appRouter.delete("/delete/:id", isAuth(), ordercontroller.deleteOrder)
appRouter.get("/get", isAuth(),  ordercontroller.getOrder)
appRouter.patch("/updatestatus/:id", isAuth(), IsAdmin, ordercontroller.updateOrderStatusbyAdmin)
appRouter.get("/getwithdate", isAuth(), IsAdmin, ordercontroller.getwithdate)

module.exports = appRouter;
