//mongoose est une bibliothèque javascript(node js) pour la modélisation d'objets MongoDB

const mongoose= require("mongoose")

const UserSchema= mongoose.Schema({

    username:{type: String, required:true},
    email: {type: String, required: true,  unique: true },
    password:{type:String, required: true},
    role:{type: String, enum:[ "customer", "admin"], default: "customer"}

})

const user = mongoose.model("user", UserSchema) // devient users: c le nom de la collection
module.exports= user