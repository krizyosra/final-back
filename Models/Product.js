const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
name:{type:String},
description:{type:String},
price:{type:Number},
originalPrice: {
    type: Number,
    default: 0 // ou null si tu veux qu'il commence vide
  },
img:{type:String},
version:{type:String},
date:{type:Date,default:Date.now},
likes: { type: Number, default: 0 }, // Compteur de likes
subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
brandId: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
promotionId: { type: mongoose.Schema.Types.ObjectId, ref: "promotion"}

})

const product=mongoose.model("product",productSchema)

module.exports=product