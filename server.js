require("dotenv").config();

const express = require("express");
const app = express();
const Routeuser = require("./Routes/UserRoute");
const Routecategory = require ("./Routes/CategoryRoute")
const RoutesubCategory= require("./Routes/subCategoryRoute")
const Routebrand= require("./Routes/BrandRoute")
const Routeproduct= require("./Routes/ProductRoute")
const Routepromotion= require("./Routes/PromotionRoute")
const Routecomment = require("./Routes/CommentRoute")
const Routefavorite = require("./Routes/Favorite")
const Routeorder = require("./Routes/OrderRoute")
const cookieParser = require('cookie-parser')
const cors = require('cors');

const allowedOrigins = ['https://client-jade-chi.vercel.app'];

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Si vous travaillez avec des cookies ou des sessions
  };
  
  app.use(cors(corsOptions));


const connect = require("./Config/Connect");
connect();

//app.use(cors(corsOptions))
app.use("/uploads",express.static(__dirname+"/uploads"))
const port = process.env.PORT;

app.use(cookieParser())
app.use(express.json());
app.use("/api/user", Routeuser);
app.use("/api/category", Routecategory)
app.use("/api/subcategory", RoutesubCategory)
app.use("/api/brand", Routebrand)
app.use("/api/promotion", Routepromotion)
app.use("/api/product", Routeproduct)
app.use("/api/comment", Routecomment)
app.use("/api/favorite", Routefavorite)
app.use("/api/order",Routeorder )






//l'instance app représente votre application express : pour gérer les routes/pour utliser les middlewares/pour démarrer le serveur: app.listen

//pour démarrer un serveur http qui écoute les requetes entrantes sur un port spécifié
app.listen(port, () => {
  console.log("server is running");
});
