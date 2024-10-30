const mongoose = require("mongoose");

const FavorisSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
   
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', // Référence aux produits favoris
        required: true
      }], 

      
     
});

const Favoris = mongoose.model("favoris", FavorisSchema); // Nom du modèle en majuscule
module.exports = Favoris;
