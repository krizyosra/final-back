const express = require("express");
const appRouter = express.Router();
const commentcontroller = require("../Controllers/CommentsController");
const isAuth = require('../middlewares/isAuth');
const check = require("../middlewares/Check");
const IsAdmin = require("../middlewares/isAdmin");


appRouter.post("/add", isAuth(),commentcontroller.addcomment);
appRouter.get("/getAll", commentcontroller.getAllcomments)
appRouter.delete("/delete/:id" , isAuth(), check,  commentcontroller.deleteComment)
appRouter.delete("/delete/admin/:id", isAuth(), IsAdmin, commentcontroller.deleteComment)
appRouter.patch("/update/:id",  isAuth(), check, commentcontroller.updateComment)
appRouter.get("/getOne/:id", commentcontroller.getOneComment)

module.exports = appRouter;
