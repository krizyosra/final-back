const mongoose = require("mongoose");

const prodschema =mongoose.Schema({
  namep:{type:String},
  descriptionp:{type:String},
  pricep:{type:Number},
  quantity: {type:Number}
 
  
  })
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },

  
  products: [prodschema],

  total: {
    type: Number

  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
