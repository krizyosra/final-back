//mongoose est une bibliothèque javascript(node js) pour la modélisation d'objets MongoDB

const mongoose= require("mongoose")

const subcategory= mongoose.Schema({

    name:{type: String, required:true, unique: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true }, // Référence à l'ID de la catégorie
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'promotion' },


})

const Subcategory = mongoose.model("Subcategory", subcategory) 
module.exports= Subcategory