const Comment = require("../Models/Comments");
const comments = require("../Models/Comments");
const productt = require("../Models/Product");
const userr = require("../Models/User");

exports.addcomment = async (req, res) => {
    try {
  
      const {text, product} = req.body
      const productexist = await productt.findById(product)

      if (!productexist){
        return res.status(400).send({msg:"product not found !"})
      }
    /*  const productexist = await productt.findById(product)
      const userexist = await userr.findById(user)
      
      
      if (!productexist){
        return res.status(400).send({msg:"product not found !"})
      }

      if(!userexist)
        return res.status(400).send({msg:"user not found !"})
  
      */
      const newComment = new comments(req.body);
  
      newComment.user = req.user._id
      await newComment.save();

      res.status(201).send("The Comment has been successfully stored");
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "An error occurred while adding the comment" });
    }
  };

  exports.getAllcomments = async (req, res) => {
    try {
      const comments = await Comment.find().populate("product").populate("user")
      res.status(200).send(comments);
    } catch (error) {
      console.log(error);
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
      const result= await Comment.deleteOne({ _id: req.params.id });

      if(result.deletedCount == 1){
        return res.status(200).send("success");
      }
      return res.status(200).send("failed");

    } catch (error) {
      console.log(error);
    }
  };

  exports.updateComment = async (req, res) => {
    try {
      const CommentId = req.params.id;
      const updatedComment = await Comment.findByIdAndUpdate(CommentId, req.body, {
        new: true,
      });
  
      if (!updatedComment) {
        return res.status(404).send({ msg: "Comment not found" });
      }
  
      return res
        .status(200)
        .send({ msg: "Comment updated successfully", updatedComment });
    } catch (error) {
      console.log(error);
    }
  };

  exports.getOneComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const getOne = await Comment.findById(commentId);
  
      if (!getOne) {
        return res.status(404).send({ msg: "Comment not found" });
      }
  
      return res.status(200).send(getOne);
    } catch (error) {
      return res.status(500).send({ msg: "Server error" });
    }
  };