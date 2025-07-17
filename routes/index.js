const express = require('express');
const router = express.Router();
const { createUser } = require("../controllers/UserController.js")

router.get("/", (req, res) => {
    res.send("hello from get router")
})

router.post("/add-user", createUser)


module.exports = router