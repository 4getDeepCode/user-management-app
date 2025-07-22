const e = require("express");
const userModel = require("../models/UserModel.js");
const { generateHash, verifyHash } = require("./bcrypt.js");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.age || !userData.email || !userData.password || !userData.role) {
      res.json({ massage: "required fields are missing" })
      return;
    }
    const user = await userModel.findOne({ email: userData.email })
    if (user) {
      res.json({ massage: "User already exists" })
      return;
    }
    const passwordHash = await generateHash(userData.password)
    await userModel.collection.insertOne({ ...userData, password: passwordHash });
    return res.json({ massage: "User added successfully" });
  } catch (err) {
    console.log(err);

    return res.json({ massage: "Something went wrong" });
  }
};

exports.listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.json({ massage: "Something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (!userData.name || !userData.age || !id) {
      res.json({ massage: "required fields are missing" });
      return;
    }

    await userModel.findByIdAndUpdate(id, userData);
    return res.status(200).json({ massage: "user data updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ massage: "Something went wrong" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ massage: "user data deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ massage: "Something went wrong" });
  }
};


exports.userLogin = async (req, res) => {
try{

   const userData = req.body;
    if (!userData.email || !userData.password) {
      res.json({ massage: "required fields are missing" })
      return;
    }

    const user = await userModel.findOne({ email: userData.email })

    if (!user) {
      res.json({ massage: "User does not exists" })
      return;
    }

    const verifyPassword = await verifyHash(userData.password, user.password)
    // console.log(verifyPassword);
    

    if(!verifyPassword) {
       res.json({ massage: "Wrong Password" })
      return;
    }
    res.json({massage: "user login successefully"})
    
  } catch(err){
    return res.json({massase: err})
  }

};