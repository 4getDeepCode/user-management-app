const userModel = require("../models/UserModel.js")

exports.createUser = async (req, res) => {
    const userData = req.body;

    if(!userData.name || !userData.age){
        res.json({massege: "required fields are missing"})
        return
    }

    await userModel.collection.insertOne(userData) ;
    res.json({ massege: "User added successfully"})

}