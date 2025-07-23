const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const e = require("express");
dotenv.config();

exports.generateToken = async(data) =>{
   try {
        const token =  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '100000s' });
        return token;
    } catch (error) {
        console.error("Token generation failed:", error);
        return null;              
    }

}

// exports.decodeToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return decoded;
//     } catch (error) {
//         console.error("Token verification failed:", error);
//         return null;
//     }
// }