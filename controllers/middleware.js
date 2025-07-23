const UserModel = require("../models/UserModel");
const { decodeToken } = require("./jwt");


exports.adminMiddleware = async(req, res, next) => {
    const token = req.headers['authorization']

    if(!token){
        res.json({massage:"user not authenticated"});
        return;
    }

    const tokenInfo = decodeToken(token);
    console.log(tokenInfo)
    if(!tokenInfo){
        res.json({massage:"user not authenticated"});
        return;
    }       

    const user = await UserModel.findOne({email: tokenInfo.email});
    if(!user){
        res.json({massage:"user not authenticated"});
        return;
    }   

    

    if(tokenInfo.role !== "admin"){
        res.json({massage:"user not authorized"});
        return;
    }       
    req.user = tokenInfo; // Attach user info to request object

    console.log("User is authenticated and authorized as admin");   






next(); 
}