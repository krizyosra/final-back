const brand = require("../Models/Brand");
const product = require("../Models/Product");

exports.addbrand = async (req, res) => {
  try {

    const {name} = req.body
    const brandexist = await brand.findOne({name})
    if (brandexist){
      return res.status(400).send({msg:"already exist !"})
    }
    const newbrand = new brand(req.body);

    await newbrand.save();

    res.status(201).send("The Brand has been successfully stored");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllBrand = async (req, res) => {
  try {
    const brands = await brand.find();
    res.status(200).send(brands);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const branddeleted = await brand.deleteOne({ _id: req.params.id });
    return res.status(200).send("The brand has been removed successfully.");
  } catch (error) {
    console.log(error);
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const updatedBrand = await brand.findByIdAndUpdate(brandId, req.body, {
      new: true,
    });

    if (!updatedBrand) {
      return res.status(404).send({ msg: "Brand not found" });
    }

    return res
      .status(200)
      .send({ msg: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const getOne = await brand.findById(brandId)

    if (!getOne) {
      return res.status(404).send({ msg: "Brand not found" });
    }

    return res.status(200).send(getOne);
  } catch (error) {
    return res.status(500).send({ msg: "Server error" });
  }
};
/*
exports.getbrandwithpromotion = async (req, res) => {
  try {
    const brands = await brand.find().populate("promotionId");
    const brandwithpromo = brands.filter(brand => brand.promotionId!=null) 
    res.send(brandwithpromo)
  } catch (error) {
    console.log(error);
  }
};
*/