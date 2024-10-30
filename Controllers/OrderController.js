const Order = require("../Models/order");
const product = require("../Models/Product");

/*
exports.addOrder = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id; // Récupère l'ID utilisateur depuis les paramètres d'URL

    const Product = await product.findById(productId);
    if (!Product) {
      return res.status(404).send({ msg: "Product not found!" });
    }

    let order = await Order.findOne({ userId }).populate("products")

  //  console.log(order)
    if (!order) {
      order = new Order({ userId, products: [productId] });
    } else {
      if (order.products.includes(productId)) {
        return res
          .status(400)
          .send({ msg: "Product already added to your order!" });
      }
      order.products.push(productId);
     
      
     /* const productsdetails = order.products;
     // console.log(productsdetails)

    
      order.total = 0;
      for (const p of productsdetails) {
       // console.log(p)
       

        if (p.price !== undefined && typeof p.price === 'number' && !isNaN(p.price)) {
            order.total += p.price;
          //  console.log(order.total)
        } else {
            console.error("Le prix du produit n'est pas valide");
        }
      }


    }
   

    await order.save();
    return res.status(200).send({ msg: "Product added to Order" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "An error occurred while adding to order" });
  }
};

*/


exports.addOrder = async (req, res) => {
  try {
    const { products, totalAmount  } = req.body; // Récupère les produits et le montant total depuis la requête
    const userId = req.user._id; // Récupère l'ID utilisateur depuis l'authentification

    console.log(req.body)
    if (!products || products.length === 0) {
      return res.status(400).send({ msg: "No products provided!" });
    }

    
    const newOrder = new Order({
      userId,
      products, 
    
      total: totalAmount,
    
      orderDate: Date.now() // Utilise la date actuelle pour la nouvelle commande
    });

    // Sauvegarder la nouvelle commande
    await newOrder.save();

    return res.status(200).send({ msg: "Order created successfully", order: newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "An error occurred while adding the order" });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user; // Récupère l'ID utilisateur depuis les paramètres d'URL
    // console.log(req.user)
    const productId = req.params.id;

    const orderdetails = await Order.findOne({ userId }).populate("products");
    //  console.log(orderdetails)

    const productRemoved = orderdetails.products.find(
      (p) => p._id.toString() === productId
    );
    // console.log(productRemoved)

    const priceremoved = productRemoved.price;
    console.log(priceremoved);

    orderdetails.total -= priceremoved;

    // L'ID de l'utilisateur (authentifié)

    // Vérifier si le produit est dans les favoris de l'utilisateur
    const order = await Order.updateOne(
      { userId: userId },
      {
        $pull: { products: productId },

        $set: { total: orderdetails.total },
      }
    );
    if (!order) {
      return res.status(404).send({ msg: "Product not found in order" });
    }

    res.status(200).send({ msg: "Product removed from order" });
  } catch (error) {
    console.error(error);
  }
};

exports.getOrder = async (req, res) => {
  const userId = req.user._id;
  console.log(userId); // L'ID de l'utilisateur (authentifié)

  // Trouver tous les favoris de l'utilisateur
  const order = await Order.find({ userId: userId }).populate("products");
  res.status(200).send({ order });
};

exports.updateOrderStatusbyAdmin = async (req, res) => {
  try {
    const OrderId = req.params.id;
    const status = req.body.status;
    const allstatus = Order.schema.path("status").enumValues;
    //  console.log(Status)

    if (!allstatus.includes(status)) {
      return res.send({ msg: "status invalid !" });
    }

    const updatedStatus = await Order.findByIdAndUpdate(
      OrderId,
      { status },
      { new: true }
    );
    res.send(updatedStatus);

    // console.log(allstatus)
  } catch (error) {
    console.log(error);
  }
};

exports.getwithdate = async (req, res) => {
  const { startdate, enddate } = req.query;
  const Start = new Date(startdate);
  const End = new Date(enddate);

  try {
    // console.log(startdate)
    const orders = await Order.find({
      orderDate: { $gte: Start, $lte: End },
    });

    if (orders.length == 0) {
      return res.send({ msg: "There are no orders during this period." });
    }

    res.send(orders);
  } catch (error) {
    console.log(error);
  }
};
