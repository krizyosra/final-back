const subCategory = require("../Models/Subcategory");
const Category = require("../Models/Category");

exports.addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // Vérifiez si la catégorie existe
    let categoryExist;
    try {
      categoryExist = await Category.findById(category);
     // console.log(categoryExist)
    } catch (error) {
      return res.status(400).send({msg: "Category not found !"});
    }

    if (!categoryExist) {
      return res.status(404).send("Category not found");
    }

       // Vérifiez si la sous-catégorie existe déjà
       const subCategoryExist = await subCategory.findOne({ name, category });

       if (subCategoryExist) {
         return res.status(400).send({ msg: "Sub-category already exists" });
       }

    // Créez la sous-catégorie
   
    const newSubCategory = new subCategory({
      name,
      category: category, // Référence à l'ID de la catégorie
    });

    

    await newSubCategory.save();
    return res.status(201).send("Sub-category created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

exports.getAllSubCategory = async (req, res) => {
    try {
        const subCategories = await subCategory.find().populate('category').populate('promotionId')
      res.status(200).send(subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  exports.deleteSubCategory = async (req, res) => {
    try {
      const result = await subCategory.deleteOne({ _id: req.params.id });
      return res.status(200).send("The Sub-Category has been removed successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  exports.updateSubCategory = async (req, res) => {
    try {
      const subCategoryId = req.params.id;
      const result = await subCategory.findByIdAndUpdate(subCategoryId, req.body, {
        new: true,
      });
  
      if (!result) {
        return res.status(404).send({ msg: "Sub-Category not found" });
      }
  
      return res
        .status(200)
        .send({ msg: "Sub-Category updated successfully",  result });
    } catch (error) {
      console.log(error);
    }
  };
  
  exports.getOneSubCategory = async (req, res) => {
    try {
      const subId = req.params.id;
      const getOne = await subCategory.findById(subId);
  
      if (!getOne) {
        return res.status(404).send({ msg: "Sub-Category not found" });
      }
  
      return res.status(200).send(getOne); 
    } catch (error) {
      return res.status(500).send({ msg: "Server error" }); 
    }
  };
  
  /*
  exports.getSubCategoryWithpromotion = async(req,res)=>{

    try {

      const subCategories = await subCategory.find().populate("promotionId")
      
      const subcategoriespromo = subCategories.filter(result => result.promotionId != null)
    res.send(subcategoriespromo)
    } catch (error) {
      console.log(error)
    }
  }
*/
