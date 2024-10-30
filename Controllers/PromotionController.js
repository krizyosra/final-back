const promotion = require("../Models/Promotion");

const Product = require("../Models/Product");
const SubCategory = require("../Models/Subcategory");
const Category = require("../Models/Category");
const brand = require("../Models/Brand");
const product = require("../Models/Product");
const moment = require("moment");

exports.addpromotion = async (req, res) => {
  try {
    const { dateStart, dateEnd, conditions, discountValue, promoCode } = req.body;
    const startDate = moment(dateStart);
    const endDate = moment(dateEnd);

    if (promoCode && typeof promoCode !== 'string') {
      return res.status(400).send({ msg: "Promo code must be a string." });
    }
    if (discountValue == 0) {
      return res.send({ msg: "Discount cannot be null." });
    }
    if (conditions == "") {
      return res.send({ msg: "Providing conditions is necessary." });
    }
    if (startDate.isSameOrAfter(endDate)) {
      return res
        .status(400)
        .send({ msg: "The start date must be before the end date." });
    }
    if (endDate.isBefore(moment())) {
      return res
        .status(400)
        .send({ msg: "The promotion has already expired." });
    }

    const currentDate = !endDate.isSame(moment(), "day");

    const newpromotion = new promotion({ ...req.body, isActive: currentDate });

    await newpromotion.save();

    res.status(201).send("The promotion has been successfully stored");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "An error occurred while saving the promotion." });
  }
};

exports.getAllPromotion = async (req, res) => {
  try {
    const promo = await promotion.find();
    res.status(200).send(promo);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const params = req.params.id;
    const result = await promotion.deleteOne({ _id: params });
    return res.status(200).send("The Promotion has been removed successfully.");
  } catch (error) {
    console.log(error);
  }
};
exports.updatePromotion = async (req, res) => {
  try {
    const promotionId = req.params.id;
    const updatedPromotion = await promotion.findByIdAndUpdate(
      promotionId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedPromotion) {
      return res.status(404).send({ msg: "Promotion not found" });
    }

    return res
      .status(200)
      .send({ msg: "Promotion updated successfully", updatedPromotion });
  } catch (error) {
    console.log(error);
  }
};



exports.addpromotionwithproduct = async (req, res) => {
  const { promo, promoCode, productsIds } = req.body;

  try {
    // Rechercher les produits à modifier
    const idproduct = await product.find({ _id: { $in: productsIds } });

    // Rechercher la promotion basée sur l'ID ou le code promo
    let promotionData;
    if (promo) {
      promotionData = await promotion.findById(promo);
    } else if (promoCode) {
      promotionData = await promotion.findOne({ promoCode });
    }

    // Si aucune promotion n'est trouvée
    if (!promotionData) {
      return res.status(400).send({ msg: "Invalid promo or promo code!" });
    }

    // Appliquer la promotion sur chaque produit
    for (const article of idproduct) {
      let finalPrice;

      // Vérifiez si le produit a déjà une promotion
      if (article.promotionId) {
        // Réinitialisez le prix du produit avant de supprimer la promotion actuelle
        article.price = article.originalPrice || article.price; // Si le prix original n'existe pas, garder le prix actuel
        article.promotionId = null; // Supprimer la promotion actuelle
      }

      // Sauvegarder le prix d'origine s'il n'est pas déjà sauvegardé
      if (!article.originalPrice) {
        article.originalPrice = article.price;
      }

      // Appliquer la promotion en fonction du type (pourcentage ou fixe)
      if (promotionData.type === 'percentage') {
        const discount = (promotionData.discountValue / 100) * article.price;
        finalPrice = article.price - discount;

        if (discount > article.price) {
          return res.status(400).send({ msg: "The discount cannot be greater than the product price." });
        }
      } else if (promotionData.type === 'fixed') {
        finalPrice = article.price - promotionData.discountValue;

        if (finalPrice < 0) {
          return res.status(400).send({ msg: "The final price cannot be negative." });
        }
      }

      // Mettre à jour le prix et la promotion
      article.price = finalPrice;
      article.promotionId = promotionData._id;
      await article.save();
    }

    // Mettre à jour tous les produits avec l'ID de la promotion
    await product.updateMany(
      { _id: { $in: productsIds } },
      { $set: { promotionId: promotionData._id } }
    );

    res.status(200).json({ message: "Products updated with promotion" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "An error occurred while applying the promotion." });
  }
};



exports.addpromotionwithsubcategories = async (req, res) => {
  try {
    const products = await product.find().populate("subcategoryId")
     // console.log(products)
    const { promo, subcategorieId } = req.body;

    const result = products.filter(
      (el) => el.subcategoryId._id.toString() == subcategorieId
    );
//console.log(result)
    const IDs = result.map((el) => el._id);
    if (IDs.length === 0) {
      return res.status(404).send({ msg: "No products found for the given subcategory." });
    }



    const idpromotion= await promotion.findById(promo)

    for (const idprod of result) {
      let finalPrice;

       // Vérifiez si le produit a déjà une promotion
      if (idprod.promotionId) {
        // Réinitialisez le prix du produit avant de supprimer la promotion actuelle
        idprod.price = idprod.originalPrice || idprod.price // Si le prix original n'existe pas, garder le prix actuel
        idprod.promotionId = null; // Supprimer la promotion actuelle
      }

      // Sauvegarder le prix d'origine s'il n'est pas déjà sauvegardé
      if (!idprod.originalPrice) {
        idprod.originalPrice = idprod.price;
      }
    
    if(idpromotion.type === 'percentage'){

      const discount= (idpromotion.discountValue/100)* idprod.price
     // console.log(finalprice)
     finalPrice = idprod.price - discount

     if(discount>idprod.price){
      return res.status(400).send({msg:"The discount cannot be greater than the product price."})
     }
   
    } else 

    if(idpromotion.type === 'fixed'){
      finalPrice = idprod.price - idpromotion.discountValue
     // console.log(finalprice)
     if(finalPrice<0){
      return res.status(400).send({msg:"The final price cannot be negative."})
     }

    
    }
    idprod.price = finalPrice;
  await idprod.save();
   
  }
  

    // console.log(IDs)
    await product.updateMany(
      { _id: { $in: IDs } },
      { $set: { promotionId: promo } }
    );

    res.send("subcategory updated");
  } catch (error) {
    console.log(error);
  }
};

exports.addpromotionwithcategories = async (req, res) => {
  try {
    const products = await product.find().populate({
      path: "subcategoryId",
      populate: {
        path: "category",
      },
    });
    const { promo, categoryId } = req.body;
   // console.log(products)
    const result = products.filter(
      (el) => el.subcategoryId.category._id.toString() === categoryId.toString()
    );



    const IDs = result.map((el) => el._id);
    //console.log(IDs);


    if (IDs.length === 0) {
      return res.status(404).send({ msg: "No products found for the given category." });
    }



    const idpromotion= await promotion.findById(promo)

    for (const idprod of result) {
      let finalPrice;

       // Vérifiez si le produit a déjà une promotion
      if (idprod.promotionId) {
        // Réinitialisez le prix du produit avant de supprimer la promotion actuelle
        idprod.price = idprod.originalPrice || idprod.price // Si le prix original n'existe pas, garder le prix actuel
        idprod.promotionId = null; // Supprimer la promotion actuelle
      }

      // Sauvegarder le prix d'origine s'il n'est pas déjà sauvegardé
      if (!idprod.originalPrice) {
        idprod.originalPrice = idprod.price;
      }
    
    if(idpromotion.type === 'percentage'){

      const discount= (idpromotion.discountValue/100)* idprod.price
     // console.log(finalprice)
     finalPrice = idprod.price - discount

     if(discount>idprod.price){
      return res.status(400).send({msg:"The discount cannot be greater than the product price."})
     }
   
    } else 

    if(idpromotion.type === 'fixed'){
      finalPrice = idprod.price - idpromotion.discountValue
     // console.log(finalprice)
     if(finalPrice<0){
      return res.status(400).send({msg:"The final price cannot be negative."})
     }

    
    }
    idprod.price = finalPrice;
  await idprod.save();
   
  }
  
    await product.updateMany(
      { _id: { $in: IDs } },
      { $set: { promotionId: promo } }
    );

    res.send("category updated");
  } catch (error) {
    console.log(error);
  }
};
exports.addpromotionwithbrand = async (req, res) => {
  try {
    const products = await product.find().populate("subcategoryId");
    //  console.log(products)
    const { promo, brandId } = req.body;
    console.log(promo)
    console.log(brandId)
   
    

    const result = products.filter(
      (el) => el.brandId?._id.toString() === brandId
    );
    const IDs = result.map((el) => el._id);
   // console.log(result)
    



    if (IDs.length === 0) {
      return res.status(404).send({ msg: "No products found for the given brand." });
    }



    const idpromotion= await promotion.findById(promo)

    for (const idprod of result) {
      let finalPrice;

       // Vérifiez si le produit a déjà une promotion
      if (idprod.promotionId) {
        // Réinitialisez le prix du produit avant de supprimer la promotion actuelle
        idprod.price = idprod.originalPrice || idprod.price // Si le prix original n'existe pas, garder le prix actuel
        idprod.promotionId = null; // Supprimer la promotion actuelle
      }

      // Sauvegarder le prix d'origine s'il n'est pas déjà sauvegardé
      if (!idprod.originalPrice) {
        idprod.originalPrice = idprod.price;
      }
    
    if(idpromotion.type === 'percentage'){

      const discount= (idpromotion.discountValue/100)* idprod.price
     // console.log(finalprice)
     finalPrice = idprod.price - discount

     if(discount>idprod.price){
      return res.status(400).send({msg:"The discount cannot be greater than the product price."})
     }
   
    } else 

    if(idpromotion.type === 'fixed'){
      finalPrice = idprod.price - idpromotion.discountValue
     // console.log(finalprice)
     if(finalPrice<0){
      return res.status(400).send({msg:"The final price cannot be negative."})
     }

    
    }
    idprod.price = finalPrice;
  await idprod.save();
   
  }
    await product.updateMany(
      { _id: { $in: IDs } },
      { $set: { promotionId: promo } }
    );

    res.send("brand updated");
  } catch (error) {
    console.log(error);
  }
};

const updateExpiredPromotions = async () => {
  const promotions = await promotion.find({ isActive: true });

  promotions.forEach(async (promo) => {
    if (moment().isAfter(promo.dateEnd)) {
      promo.isActive = false;
      await promo.save();
    }
   
  });
};

exports.getAllpromotionActive = async (req, res) => {
  try {
    await updateExpiredPromotions();
    const promotions = await promotion.find({ isActive: true });

    res.status(200).send(promotions);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "An error occurred while retrieving promotions." });
  }
};

exports.getAllpromotionsExpired = async (req, res) => {
  try {
    const promotions = await promotion.find({ isActive: false });
   // console.log(promotions);
    res.status(200).send(promotions);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "An error occurred while retrieving promotions." });
  }
};

/*
exports.getAllPromotionsWithDetails = async (req, res) => {
  try {
    // Étape 1 : Récupérer toutes les promotions
    const promotions = await promotion.find();

    // Étape 2 : Pour chaque promotion, trouver les entités qui y sont liées
    const promotionDetails = await Promise.all(
      promotions.map(async (promotion) => {
        const products = await Product.find({ promotionId: promotion._id });
        const categories = await Category.find({ promotionId: promotion._id });
        const subCategories = await SubCategory.find({
          promotionId: promotion._id,
        });
        const brands = await brand.find({ promotionId: promotion._id });

        return {
          promotion,
          products,
          categories,
          subCategories,
          brands,
        };
      })
    );

    // Étape 3 : Envoyer les détails des promotions et leurs entités associées
    return res.status(200).send(promotionDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server error" });
  }
};
*/
