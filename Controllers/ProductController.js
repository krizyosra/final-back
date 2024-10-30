const Comment = require("../Models/Comments");
const product = require("../Models/Product");
const promotion = require("../Models/Promotion");

exports.addproduct = async (req, res) => {
  try {
    const newProduct = new product(req.body);
    const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    newProduct.img = url;
    await newProduct.save();
    return res.status(201).send({ msg: "product add succes" });
  } catch (error) {
    console.error(error);
  }
};

exports.getproductwithbrand = async (req, res) => {
  try {
    const brandId = req.query.brandId;
    const products = await product.find().populate("brandId");

    const productfiltered = products.filter(
      (result) => result.brandId._id == brandId
    );
    res.send(productfiltered);
  } catch (error) {
    console.log(error);
  }
};

exports.getproductwithsubcategory = async (req, res) => {
  try {
    const data = req.query.subCategoryId;
    const products = await product.find().populate("subcategoryId");

    // res.send(products)
    const productfiltered = products.filter(
      (result) => result.subcategoryId._id == data
    );
    res.send(productfiltered);
  } catch (error) {
    console.log(error);
  }
};

exports.getproductwithCategory = async (req, res) => {
  try {
    const category = req.query.category;
    // console.log(category)
    const products = await product.find().populate("subcategoryId");
    const result = products.filter(
      (el) => el.subcategoryId.category._id.toString() == category
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const idproduct = req.params.id;
    const productWithPromotion = await product.findById(idproduct).populate('promotionId');

  await promotion.updateMany({ _id: productWithPromotion.promotionId }, { isActive: false });

    res.status(200).send({ msg: "Product deleted and related promotions deactivated" });
    await product.deleteOne({ _id: idproduct });
   
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "An error occurred while deleting the product." });
  }
};

exports.getAllproducts = async (req, res) => {
  try {
    const products = await product.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};
exports.getproductwithdetails = async (req, res) => {
  try {
    const idproduct = req.params.id;
    const oneproduct = await product.find({ _id: idproduct });
    const comments = await Comment.find({product: idproduct}).populate({

      path: "user",
      select: "username"

    })
  
    res.status(200).send({oneproduct,comments});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server error" });
  }
};
exports.updateproduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productupdated = await product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (req.file) {
      const fileupdated = await product.findOne({ _id: req.params.id });
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      fileupdated.img = url;
      await fileupdated.save();
    }
    return res.status(200).send(productupdated);
  } catch (error) {
    console.log(error);
  }
};



exports.likeproduct = async (req,res)=>{
  const productId = req.params.id
  try {

 console.log(productId)
    const likeproduct = await product.findById(productId)
    console.log(likeproduct)

    likeproduct.likes+=1
    await likeproduct.save()

    res.status(200).json({
      message: 'Thank you for liking our product!',
      likes: likeproduct.likes  
  });
    
  } catch (error) {
    console.log(error)

  }
}
/*
exports.getproductwithpromotion = async (req, res) => {
  try {
    const products = await product.find().populate("promotionId");
    const productwithpromo = products.filter(
      (result) => result.promotionId != null
    );
    res.send(productwithpromo);
  } catch (error) {
    console.log(error);
  }
};
*/
