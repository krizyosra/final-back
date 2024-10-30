//mongoose est une bibliothèque javascript(node js) pour la modélisation d'objets MongoDB

const mongoose = require("mongoose");

const PromotionSchema = mongoose.Schema({
  name: {
    type: String,
  }, // Pourcentage ou valeur fixe

  type: {
    type: String,
    enum: ["percentage", "fixed", "codepromo"],
    required: true,
  }, // Pourcentage ou valeur fixe

  promoCode: {
    type: String, // Le code promo
    unique: true, // Pour s'assurer qu'il n'y a pas de doublons
  },
  discountValue: { type: Number, required: true }, // La valeur de la réduction
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  conditions: { type: String, required: true }, // Conditions de la promotion
  isActive: { type: Boolean, default: true }, // // Champ pour activer/désactiver la promotion
});

const promotion = mongoose.model("promotion", PromotionSchema);
module.exports = promotion;
