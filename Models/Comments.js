const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    // Référence correcte avec des majuscules pour 'User' et 'Product'
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }
});

const Comment = mongoose.model("Comment", CommentsSchema); // Nom du modèle en majuscule
module.exports = Comment;
