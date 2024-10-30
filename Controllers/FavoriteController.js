const { default: mongoose } = require("mongoose");
const Favoris = require("../Models/Favoris");
const Product = require("../Models/Product");
const user = require("../Models/User");

exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;  // Récupère l'ID utilisateur depuis les paramètres d'URL
    console.log(userId)

    // Vérifier si le produit existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ msg: "Product not found!" });
    }
    

    // Vérifier les favoris
    let favoris = await Favoris.findOne({ userId });

    if (!favoris) {
      favoris = new Favoris({ userId, products: [productId] });
    } else {
      if (favoris.products.includes(productId)) {
        return res.status(400).send({ msg: "Product already added to favorites!" });
      }
      favoris.products.push(productId);
    }

    await favoris.save();
    return res.status(200).send({ msg: "Product added to favorites" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "An error occurred while adding to favorites" });
  }
};


exports.deleteFavorite= async (req,res)=>{

    try {
       
        const userId = (req.user)  // Récupère l'ID utilisateur depuis les paramètres d'URL
        console.log(req.user)
        const productId = (req.params.id);


    // L'ID de l'utilisateur (authentifié)

     // Vérifier si le produit est dans les favoris de l'utilisateur
     const favoris = await Favoris.updateOne(
        { userId: userId },
        { $pull: { products: productId } }
    );
     if (!favoris) {
         return res.status(404).send({ msg: "Product not found in favorites" });
     }
 
     res.status(200).send({ msg: "Product removed from favorites" });
 }

     catch (error) {
        console.error(error)
    }
}


// Voir les produits favoris d'un utilisateur
exports.getFavorites = async (req, res) => {
    const userId = req.user._id; 
    console.log(userId) // L'ID de l'utilisateur (authentifié)

    // Trouver tous les favoris de l'utilisateur
    const favoris = await Favoris.findOne({ userId: userId }).populate("products");
    res.status(200).send({ favorites: favoris });
};



