const e = require("express");
const userModel = require("../models/UserModel.js");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.name || !userData.age) {
      res.json({ massege: "required fields are missing" });
      return;
    }

    await userModel.collection.insertOne(userData);

    return res.json({ massege: "User added successfully" });
  } catch (err) {
    console.log(err);

    return res.json({ massege: "Something went wrong" });
  }
};

exports.listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.json({ massege: "Something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (!userData.name || !userData.age || !id) {
      res.json({ massege: "required fields are missing" });
      return;
    }

    await userModel.findByIdAndUpdate(id, userData);
    return res.status(200).json({ massege: "user data updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ massege: "Something went wrong" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ massege: "user data deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ massege: "Something went wrong" });
  }
};