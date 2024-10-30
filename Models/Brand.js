//mongoose est une bibliothèque javascript(node js) pour la modélisation d'objets MongoDB

const mongoose= require("mongoose")

const BrandSchema= mongoose.Schema({

    name:{type: String, required:true},
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'promotion' },

})

const brand = mongoose.model("brand", BrandSchema) 
module.exports= brand


