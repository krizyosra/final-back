const category = require("../Models/Category");

exports.addcategory = async (req, res) => {
  try {

    const {name}= req.body

    const categoryexist = await category.findOne({name})
    if(categoryexist){
      return res.status(400).send({msg:"already exist"})
    }
    const newcategory = new category({name});

    await newcategory.save();

    res.status(201).send("The category has been successfully stored");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await category.find().populate("promotionId");
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const params = req.params.id;
    const result = await category.deleteOne({ _id: params });
    return res.status(200).send("The category has been removed successfully.");
  } catch (error) {
    console.log(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedcategory = await category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedcategory) {
      return res.status(404).send({ msg: "Category not found" });
    }

    return res
      .status(200)
      .send({ msg: "Category updated successfully", updatedcategory });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const getOne = await category.findById(categoryId).populate("promotionId");

    if (!getOne) {
      return res.status(404).send({ msg: "Category not found" });
    }

    return res.status(200).send(getOne);
  } catch (error) {
    return res.status(500).send({ msg: "Server error" });
  }
};
/*
exports.getcategorywithpromotion = async (req, res) => {
  try {
    const categories = await category.find().populate("promotionId");
    // console.log(categories)

    const categorypromo = categories.filter(
      (result) => result.promotionId != null
    );
    res.send(categorypromo);
  } catch (error) {
    console.log(error);
  }
};
*/