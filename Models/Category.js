//mongoose est une bibliothèque javascript(node js) pour la modélisation d'objets MongoDB

const mongoose= require("mongoose")

const CategorySchema= mongoose.Schema({

    name:{type: String, required:true,  unique: true},
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'promotion' },

})

const Category = mongoose.model("category", CategorySchema) 
module.exports= Category


