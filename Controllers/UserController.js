const bcrypte = require("bcrypt");
const user = require("../Models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, role,username } = req.body;


  try {

    if(role){
      return res.status(401).send("non autorisé")
  }

    const emailexist = await user.findOne({ email});
    if (emailexist) {
      return res.status(400).send("Email already exists. Please log in.");
    }

    let passwordhashed = await bcrypte.hash(password, 10);
    req.body.password = passwordhashed;

    const newUser = new user(req.body);
    await newUser.save();


    const token = jwt.sign({ _id: newUser._id }, process.env.secretkey, {
      expiresIn: "1h",
    });
    newUser.password = undefined;

   // res.cookie("token", token);
   




    return res.status(201).send({token : token});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
}


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await user.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const boolmdp = await bcrypte.compare(password, existUser.password);
    if (!boolmdp) {
      return res.status(400).json({ msg: "Incorrect password. Please try again" });
    }

    const token = jwt.sign({ _id: existUser._id }, process.env.secretkey, {
      expiresIn: "1h",
    });
    existUser.password = undefined;

    //res.cookie("token", token);

    return res.status(200).json({ token : token});
  
  } catch (error) {
    console.log(error);
  }
};

exports.current = (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
  }
};

exports.updatepassword=async(req,res)=>{

  const {currentpassword,newpassword}=req.body
 
  try {
      
    const finduser= await user.findById(req.params.id)
    const isMatched = await bcrypte.compare(currentpassword,finduser.password)
   if(isMatched)
  {   if(currentpassword==newpassword){
      return res.status(400).send({msg:"password already exist "})
  } 
  else  {
       const  hash_newpassword = await bcrypte.hash(newpassword,10)
       const updatenewpassword = await user.findByIdAndUpdate(req.params.id,{password:hash_newpassword},{ new: true })
      return    res.status(200).send(updatenewpassword)
      }
    
}
else return res.status(400).send("bad current password")

 } catch (error) {
  console.log(error);
 }
}

exports.updateuser=async(req,res)=>{
  try {
       const result=await user.findByIdAndUpdate(req.params.id,req.body,{ new: true })
      
     res.status(200).send(result)
  } catch (error) {
      console.log(error);
  }
}
